package api

import (
	"mindpill/backend/internal/database"
	"mindpill/ent/counselor"
	"mindpill/ent/group"
	"mindpill/ent/note"
	"mindpill/ent/room"
	"mindpill/ent/user"
	"time"

	"github.com/valyala/fasthttp"
)

type Note struct {
	Content string `json:"content"`
}

type CreateNoteRequest struct {
	GroupID int `json:"group_id"`
	RoomID  int `json:"room_id"`
}

func CreateNote(ctx *fasthttp.RequestCtx) {
	token, err := ParseAuthorization(ctx)
	if err != nil {
		Unauthorized(ctx, err, "unauthorized")
		return
	}

	var req CreateNoteRequest
	if err := ParseRequestBody(ctx, &req); err != nil {
		BadRequest(ctx, err, "failed to parse request body")
		return
	}

	counselorRecord, err := database.Ent().
		Counselor.Query().
		Where(
			counselor.HasUserWith(user.IDEQ(token.UserID)),
			counselor.HasGroupWith(group.IDEQ(req.GroupID)),
		).
		Only(ctx)
	if err != nil {
		Forbidden(ctx, err, "you must be counseler of this group")
		return
	}

	roomRecord, err := database.Ent().
		Room.Query().
		Where(
			room.IDEQ(req.RoomID),
			room.HasGroupWith(group.IDEQ(req.GroupID)),
		).
		Only(ctx)
	if err != nil {
		BadRequest(ctx, err, "requested room is not exists")
		return
	}

	database.Ent().
		Note.Create().
		SetRoom(roomRecord).
		SetCounselor(counselorRecord).
		Save(ctx)
}

type GetNotesRequest struct {
	RoomID int `json:"room_id"`
	LastID int `json:"last_id"`
}

type GetNotesResponse struct {
	Notes []Note `json:"notes"`
}

func GetNotes(ctx *fasthttp.RequestCtx) {
	token, err := ParseAuthorization(ctx)
	if err != nil {
		Unauthorized(ctx, err, "unauthorized")
		return
	}

	var req GetNotesRequest
	if err := ParseRequestBody(ctx, &req); err != nil {
		BadRequest(ctx, err, "failed to parse request body")
		return
	}

	roomRecord, err := database.Ent().
		Room.Query().
		Where(
			room.IDEQ(req.RoomID),
		).
		WithGroup().
		Only(ctx)
	if err != nil {
		BadRequest(ctx, err, "requested room is not exists")
		return
	}

	if !token.IsAdmin && !token.Groups[roomRecord.Edges.Group.ID].IsCounselor {
		Forbidden(ctx, nil, "permission denied")
		return
	}

	noteRecords, err := database.Ent().
		Note.Query().
		Where(
			note.IDGT(req.LastID),
			note.HasRoomWith(room.IDEQ(roomRecord.ID)),
		).
		Limit(50).
		All(ctx)
	if err != nil {
		InternalServerError(ctx, err, "Failed to fetch notes")
		return
	}

	var notes = make([]Note, 0, len(noteRecords))
	for _, record := range noteRecords {
		notes = append(notes, Note{
			Content: record.Content,
		})
	}

	SendResponse(ctx, &GetNotesResponse{
		Notes: notes,
	})
}

type UpdateNoteRequest struct {
	NoteID  int    `json:"note_id"`
	Content string `json:"content"`
}

func UpdateNote(ctx *fasthttp.RequestCtx) {
	token, err := ParseAuthorization(ctx)
	if err != nil {
		Unauthorized(ctx, err, "unauthorized")
		return
	}

	var req UpdateNoteRequest
	if err := ParseRequestBody(ctx, &req); err != nil {
		BadRequest(ctx, err, "failed to parse request body")
		return
	}

	noteRecord, err := database.Ent().
		Note.Query().
		Where(
			note.IDEQ(req.NoteID),
		).
		Only(ctx)
	if err != nil {
		BadRequest(ctx, err, "requested room is not exists")
		return
	}

	isOwner, err := database.Ent().
		Counselor.Query().
		Where(
			counselor.HasNotesWith(note.IDEQ(noteRecord.ID)),
			counselor.HasUserWith(user.IDEQ(token.UserID)),
		).
		Exist(ctx)
	if err != nil {
		InternalServerError(ctx, err, "database error")
		return
	}

	if !isOwner {
		Forbidden(ctx, nil, "permission denied")
		return
	}

	_, err = noteRecord.Update().
		SetContent(req.Content).
		SetUpdatedAt(time.Now()).
		Save(ctx)
	if err != nil {
		InternalServerError(ctx, err, "Failed to save the note")
		return
	}

	SendResponse(ctx, respOK)
}

type DeleteNoteRequest struct {
	NoteID int `json:"note_id"`
}

func DeleteNote(ctx *fasthttp.RequestCtx) {
	token, err := ParseAuthorization(ctx)
	if err != nil {
		Unauthorized(ctx, err, "unauthorized")
		return
	}

	var req UpdateNoteRequest
	if err := ParseRequestBody(ctx, &req); err != nil {
		BadRequest(ctx, err, "failed to parse request body")
		return
	}

	isOwner, err := database.Ent().
		Counselor.Query().
		Where(
			counselor.HasUserWith(user.IDEQ(token.UserID)),
			counselor.HasNotesWith(note.IDEQ(req.NoteID)),
		).
		Exist(ctx)
	if err != nil {
		InternalServerError(ctx, err, "database error")
		return
	}

	if !isOwner {
		Forbidden(ctx, nil, "permission denied")
		return
	}

	database.Ent().
		Note.DeleteOneID(req.NoteID)

	SendResponse(ctx, respOK)
}

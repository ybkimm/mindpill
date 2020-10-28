import React, { useCallback, useEffect, useState } from 'react'
import {
  listNotesFromCounselor,
  ListNotesFromCounselorResponse
} from '../api/list_notes_from_counselor'
import { useAsyncReducer } from '../hooks/async'
import { useTrackedState } from '../state'

export interface NoteListProps {
  modifiable?: boolean
  groupID: number
  counselorID: number
  roomID?: number
}

export function NoteList({ modifiable, groupID, counselorID }: NoteListProps) {
  const state = useTrackedState()
  const [isModalActive, setModalActive] = useState(false)
  const [noteState, noteDispatch] = useAsyncReducer<
    ListNotesFromCounselorResponse
  >()

  useEffect(() => {
    if (state.token != null) {
      listNotesFromCounselor(
        {
          group_id: groupID,
          counselor_id: counselorID
        },
        state.token.access,
        noteDispatch
      )
    }
  }, [state])

  const showModal = useCallback(() => {
    setModalActive(true)
  }, [])

  const hideModal = useCallback(() => {
    setModalActive(false)
  }, [])

  return (
    <div className="note-list">
      {modifiable === true && <div className="note-item is-new-item">+</div>}
      {noteState.data?.notes.map(note => (
        <div className="note-item">
          <div className="note-preview" onClick={showModal}>
            <div className="note-preview-inner">
              {note.content}
            </div>
          </div>
          <div className={`modal${isModalActive ? ' is-active' : ''}`}>
            <div className="modal-background" onClick={hideModal}></div>
            <div className="modal-content">
              <div className="note-modal">
                <article className="message is-warning">
                  <div className="message-header">
                    메모
                    <button className="delete" onClick={hideModal}></button>
                  </div>
                  <div className="message-body">{note.content}</div>
                </article>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'
import { Paper, TextField } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: theme.spacing(30),
      height: theme.spacing(5),
      padding: theme.spacing(2),
    },
  }),
);
export default function Join() {
  const classes = useStyles();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    
    <div className="box-center-column">
      <form
        className="form-join box-center-column"
        onSubmit={handleSubmit}>
        <div className="box-top">
          <div className="mg-hr">
            <Paper className={classes.paper}>
              <TextField required id="standard-required" label="이름" size="small" fullWidth/>
            </Paper>
            
            <input name="name" type="text" placeholder="이름" />
            <input name="email" type="email" placeholder="이메일" />
            <input name="password" type="password" placeholder="비밀번호" />
            <input
              name="password2"
              type="password"
              placeholder="비밀번호 확인"
            />
          </div>
          <div className="mg-hr">
            <input name="serialNo" type="text" placeholder="군번" />
          </div>
        </div>
        <input type="submit" value="회원가입" />
      </form>
      <Link to="/login">
        <p>이미 회원이신가요?</p>
      </Link>
    </div>
  )
  
}

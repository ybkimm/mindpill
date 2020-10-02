import React from 'react'
import { Link } from 'react-router-dom'

export default class Join extends React.Component {
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // const {
    //   name,
    //   email,
    //   gender,
    //   password,
    //   password2,
    //   serialNo,
    //   rank,
    //   regiment,
    //   classification,
    //   department
    // } = e.currentTarget
    // const query = {
    //   name: name.value,
    //   email: email.value,
    //   gender: gender.value,
    //   password: password.value,
    //   password2: password2.value,
    //   serialNo: serialNo.value,
    //   rank: rank.value,
    //   regiment: regiment.value,
    //   classification: classification.value,
    //   department: department.value
    // }
    // console.log(query)
  }

  render() {
    return (
      <div className="box-center-column">
        <form
          className="form-join box-center-column"
          onSubmit={this.handleSubmit}>
          <div className="box-top">
            <div className="mg-hr">
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
}

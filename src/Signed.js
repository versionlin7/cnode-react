import React from 'react'
import {useHistory, Link} from 'react-router-dom'

function Login(props) {
  let history = useHistory()
  function out() {
    props.loginOut()
    console.log(history)
    history.replace('/cnode')
  }
  return(
    <li className="header-nav-login">
    {/* <a className="header-nav-avatar" ><img src='https://avatars2.githubusercontent.com/u/227713?v=4&s=120' /></a> */}
      <Link className="header-nav-avatar" to={'/user/' + props.user.loginname}><img src={props.user.avatar_url} alt={props.user.loginname}/></Link>
    <span onClick={out}> 退出</span>
  </li>
  )
}
export default Login
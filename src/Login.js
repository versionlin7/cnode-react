import React, { useRef } from "react";
import axios from "axios";
import API from "./api_config";
import './Login.css'


export default function Login(props) {
  const inputEl = useRef(null);
  function login() {
    console.log(inputEl.current.value)
    if(inputEl.current.value) {
      try {
        axios.post(API.userLogin, {
          accesstoken: inputEl.current.value
        }).then(result => {
          if(!result.data.success) {
            localStorage.removeItem('cnode_sign')
            alert('请输入正确的 AccessToken')
            return 
          }
          localStorage.setItem('cnode_sign', result.data)
          props.loginIn(result.data)
        })
      } catch (error) {
        console.log(error.message)
      }
    }else {
      alert('请输入 AccessToken')
    } 
  }
  return(
    <div className="panel">
      <div className="header">
        <span>
          <a href="/cnode">主页</a><span className="divider"> / </span>
          <span >登录</span>
        </span>
      </div>
    <div className="inner Login">
      <label className="item" htmlFor="name">AccessToken</label>
      <input className="item" name="name" size="30" type="text" ref={inputEl} />
      <input type="button" className="item span-primary" value="登录" onClick={login} />
    </div>
  </div>
  )
}
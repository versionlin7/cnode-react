import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import API from "./api_config";
import timeCount from "./timeCount";
import './userDetail.css'
import ListItem from './ListItem'

function UserDetail() {
  const [data, setData] = useState({});
  const [recent_topics, setRecent_topics] = useState([]);
  const [recent_replies, setRecent_replies] = useState([]);
  const [collects, setCollect] = useState(0);
  const { loginname } = useParams();

  useEffect(() => {
    //请求用户详情
    console.log(loginname);
    try {
      axios.get(API.user + loginname).then(result => {
        setData(result.data.data);
        setRecent_topics(result.data.data.recent_topics);
        setRecent_replies(result.data.data.recent_replies);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [loginname]);
  useEffect(() => {
    //请求用户收藏

    try {
      axios.get(API.userCollections + loginname).then(result => {
        setCollect(result.data.data.length);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [loginname]);

  return (
    <div>
      <div className="user-content">
        <div className="panel">
          <div className="header">
            <span>
              <Link to="/cnode">主页</Link>
              <span className="divider"> / </span>
              <span className="col_fade">个人信息</span>
            </span>
          </div>

          <div className="inner userinfo">
            <div className="user_big_avatar">
              <img
                src={data.avatar_url}
                className="user_avatar"
                title={data.loginname}
                alt={data.loginname}
              />
            </div>
            <span className="dark">{data.loginname}</span>
            <div className="user_profile">
              <ul className="unstyled">
                <span className="big">{data.score}</span> 积分
                <li>
                  <Link
                    className="dark"
                    to={"/user/" + data.loginname + "/collections"}
                    target="_blank"
                  >
                    <span className="big collect-topic-count">{collects}</span>
                    个话题收藏
                  </Link>
                </li>
                <li>
                  <ion-icon name="home"></ion-icon>
                  <a
                    className="dark"
                    href={`http://${data.githubUsername}.github.io`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >{`http://${data.githubUsername}.github.io`}</a>
                </li>
                <li>
                  <ion-icon name="logo-github"></ion-icon>
                  <a
                    className="dark"
                    href={`http://${data.githubUsername}.github.io`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @{data.githubUsername}
                  </a>
                </li>
              </ul>
            </div>
            <p className="col_fade">注册时间 {timeCount(data.create_at)}</p>
          </div>
        </div>
      </div>
      <div className="panel">
        <div className="header">
          <span className="col_fade">最近创建的话题</span>
        </div>
        <div>
          {
            recent_topics.map((item) => 
              <ListItem  key={item.id} itemCell={item} loginname={item.author.loginname} avatar_url={item.author.avatar_url} />
            )
          }
        </div>
      </div>
      <div className="panel">
        <div className="header">
          <span className="col_fade">最近参与的话题</span>
        </div>
        <div>
          {
            recent_replies.map((item) => 
              <ListItem  key={item.id} itemCell={item} loginname={item.author.loginname} avatar_url={item.author.avatar_url} />
            )
          }
        </div>
      </div>
    </div>
  );
}

export default UserDetail;

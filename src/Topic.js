import React, {useEffect, useState} from 'react'
import axios from 'axios'
import API from './api_config'
import timeCount from './timeCount.js'
import {useParams, Link} from 'react-router-dom'
import 'github-markdown-css'
import './topic.css'

function Topic() {
  const [data, setData] = useState({});
  const [replies,steReplies] = useState([])
  const [author,setAuthor] = useState({})

  const {id} = useParams()
  useEffect(() => {//请求帖子详情
    console.log(id)
    try {
      axios.get(API.topicDetail + id).then(result => {
        setData(result.data.data);
        steReplies(result.data.data.replies)
        setAuthor(result.data.data.author)
        console.log(data)
        console.log(result.data)
      })
    } catch (error) {
      console.log(error.message)
    }
  }, [id]);
   

  function tabs(tab) {
    let text 
    switch(tab) {
      case 'share':
        text = '分享'
        break
      case 'ask':
        text = '问答'
        break
      case 'job':
        text = '招聘'
        break
      case 'good':
        text = '精华'
        break
      default :
        text = '  '
    }
    return text
  }
  
    return(
      <div className="topic-main">
        <div className="topic-body">
          <div className="topic-title">
            <div style={{display:'inline-block'}}>
              <span className="put_top">{tabs(data.tab)}</span>
              {data.title}
              <div className="changes">
                <span> 发布于 {timeCount(data.create_at)}</span>
                <span> 作者 <Link to={'/user/'+ author.loginname}>{author.loginname}</Link></span>
                <span> {data.visit_count} 次浏览</span>
                <span> 来自 {tabs(data.tab)}</span>
              </div>
            </div>
            <Link to={'/user/'+ author.loginname} ><img src={author.avatar_url} alt={author.loginname} /></Link>
          </div>
          <div className="markdown-body" dangerouslySetInnerHTML={{ __html: data.content}}/>
        </div>
        <div className="panel">
          <div className="header">
            <span className="col_fade">{replies.length} 回复</span>
          </div>
          <Replies replies={replies} />
        </div>
      </div>
    )

}

function Replies (props) {

  return (
    <>
      {
        props.replies.map((reply,index) => {
          return (
            <div className="reply-cell" key={reply.id} >
              <div className="author_content">
                <Link to={'/user/'+reply.author.loginname} className="user_avatar">
                  <img src={reply.author.avatar_url} title={reply.author.loginname} alt={reply.author.loginname}/>
                </Link>
                <div className="user_info">
                  <Link className="dark reply_author" to={'/user/'+reply.author.loginname}>{reply.author.loginname}</Link>
                  <span className="reply_time">{' '}{index + 1}楼• {timeCount(reply.create_at)}</span>
                </div>
              </div>
              <div className="markdown-body reply_content" dangerouslySetInnerHTML={{ __html: reply.content}} />
            </div>
          )
        })
      }
    </>
  )
}

export default Topic
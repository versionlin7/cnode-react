import React from 'react'
import {Link} from 'react-router-dom'
import timeCount from './timeCount'
function ListItem(props) {

  return(
    <li className="topic-cell">
      <Link className="topic-cell-avatar item" to={'/user/' + props.loginname}><img src={props.avatar_url} alt={props.loginname}/></Link>
      <Link className="topic-cell-title item" to={'/topic/'+props.itemCell.id}>{props.itemCell.title}</Link>
      {(props.itemCell.visit_count !== undefined) &&
        (<span className="reply_count item">
          <span className="count_of_replies" title="回复数">
            {props.itemCell.reply_count}
          </span>
          <span className="count_seperator">/</span>
          <span className="count_of_visits" title="点击数">
            {props.itemCell.visit_count}
          </span>
        </span>)
      }
      <span className="last_active_time item">{timeCount(props.itemCell.last_reply_at)}</span>
    </li>
  )
}

export default ListItem
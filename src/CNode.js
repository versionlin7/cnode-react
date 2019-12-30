import "./CNode.css"
import React, {useState, useEffect} from 'react'
import API from './api_config'
import ListItem from './ListItem'
import axios from 'axios'
import ListPagination from './ListPagination'



function CNode () {
  const [data, setData] = useState([]);
  const [tab, setTab] = useState('all')
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {//请求帖子列表
    setIsLoading(true)
    try {
      axios.get(API.topics).then(result => {
        setData(result.data.data);
        setIsLoading(false)
      })
    } catch (error) {
      console.log(error.message)
    }
  }, []);
  
  function tabSearch(e) {//请求tab类型
    setIsLoading(true)
    setTab(e.target.value)
    try {
      axios.get(API.topics+'?tab='+e.target.value).then(result => {
        setData(result.data.data);
        setIsLoading(false)
      })
    } catch (error) {
      console.log(error.message)
    }
  }
  function searchPage(pageNum) {//请求页数
    setIsLoading(true)

    try {
      axios.get(API.topics+'?tab='+tab+'&page='+pageNum).then(result => {
        setData(result.data.data);
        console.log('search complete')
        setIsLoading(false)
      })
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className="body-List">
      <div className="body-header" onChange={tabSearch}> 
        <label><input type="radio" name='tab' value="all" defaultChecked /><span>全部</span></label>
        <label><input type="radio" name='tab' value="good" /><span>精华</span></label>
        <label><input type="radio" name='tab' value="ask" /><span>问答</span></label>
        <label><input type="radio" name='tab' value="share" /><span>分享</span></label>
        <label><input type="radio" name='tab' value="job" /><span>招聘</span></label>
      </div>
      <div>
        <ul className="topic-list">
          {isLoading ? <div>Loading ...</div>
            :
            data.map(item => (
              <ListItem  key={item.id} itemCell={item} loginname={item.author.loginname} avatar_url={item.author.avatar_url}/>
            ))
          }
        </ul>
        <ListPagination  pageConfig={{groupCount:5,pageSize:45}} searchPage={searchPage} />
      </div>
    </div>
  )
}

export default CNode
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import CNode from './CNode'
import 'normalize.css'
import './App.css'
import API from './api_config'
import axios from 'axios'
import UserDetail from './UserDetail'
import UserCollections from './UserCollections'
import Topic from './Topic';
import UserTopic from './UserTopic';
import Login from './Login'
import Signed from './Signed'

function App() {
  const [user, setUser] = useState({})
  const [signed, setSigned] = useState(false)

  useEffect(() => {//用户登录
    let actoken = localStorage.getItem('cnode_sign')
    if(actoken) {
      try {
        axios.post(API.userLogin, {
          accesstoken: actoken
        }).then(result => {
          if(!result.data.success) {
            localStorage.removeItem('cnode_sign')
          }
          setUser(result.data);
          setSigned(true)
        })
      } catch (error) {
        console.log(error.message)
      }
    }
  }, []);
  function loginOut() {
    setSigned(false)
  }
  function loginIn(data) {
    setUser(data)
    setSigned(true)
  }
  return (
    <div className="cNode">
      <BrowserRouter basename="/cnode">
        <header className="App-header">
          <a href="/cnode" className="brand">
            <img src="/cnode/cnodejs_light.svg" alt='CNode'/>
          </a> 
          <ul className="header-nav">
            <li><a href="/cnode">首页</a></li>
            {
              signed ?
              <Signed loginOut={loginOut} user={user} />
              :
              <li><Link to="/signin">登录</Link></li>
            }
          </ul>
        </header>
        <main className="main-body">
          <Switch>
            <Route path="/topic/:id"  component={Topic} />
            <Route path="/user/:loginname"  component={UserDetail} />
            <Route path='/user/:loginname/collections'  component={UserCollections} />
            <Route path='/user/:loginname/topic'  component={UserTopic} />
            <Route path='/signin' >
              <Login loginIn={loginIn}/>
            </Route>
            <Route path="/" exact component={CNode} />
            {/* <Route path="/getstart" component={GetStart} />
            <Route path="/about" component={About} /> */}
            <Route path="*" component={Status} />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}
function Status() {
  return(
    <div>404 NotFound</div>
  )
}
export default App;

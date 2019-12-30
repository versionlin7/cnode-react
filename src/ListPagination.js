import './ListPagination.css'
import React,{ useState } from "react";

export default function Pagination (props){
  const [currentPage,setCurrentPage] = useState(1)
  const [startPage, setStartPage] = useState(1)
  const pageSize = props.pageConfig.pageSize
  const groupCount = props.pageConfig.groupCount
  
  function prevPage() {
    if(currentPage === 1) {
      return 
    }
    go(currentPage - 1)
    
  }

  function nextPage() {
    if(currentPage === pageSize) {
      return 
    }
    go(currentPage + 1)
  }

  function go(pageCurr) {
    if(pageCurr === currentPage) {
      return 
    }
    // 处理下一页的情况
    if(pageCurr % groupCount === 1){

      setStartPage(pageCurr)
      console.log(startPage)
    }

    // 处理上一页的情况
    if(pageCurr % groupCount === 0){
        setStartPage(pageCurr - groupCount + 1)
    }

    setCurrentPage(pageCurr)
    props.searchPage(pageCurr)

  }

  function create() {
  let pages = [];

  if((pageSize <= groupCount) ||(startPage + groupCount > pageSize)){
      for(let i = startPage;i <= pageSize; i++){
          // 点击页码时调用 go 方法，根据 state 判断是否应用 active 样式
          pages.push(<li onClick = {() => go(i)} className={currentPage === i ? 'pagination-item selected' : 'pagination-item active'} key={i}>{i}</li>)
      }
  }else{
    for(let i = startPage;i < startPage+groupCount ;i++){
        pages.push(<li onClick = {() => go(i)} className={currentPage === i ? 'pagination-item selected' : 'pagination-item active'} key={i} >{i}</li>)
    }
    // 分页中间的省略号
    pages.push(<li className="pagination-item " key={ -1 }>···</li>)
  }
  return pages;
  }
  return(
    
      <ul className="pagination">
        <li className={currentPage === 1 ? 'pagination-item disable' : 'pagination-item active' }  onClick={prevPage}>上一页</li>
          {
           create()
          }
        <li  className={currentPage === pageSize ? 'pagination-item disable' : 'pagination-item active'}  onClick={nextPage}>下一页</li>
      </ul>
  );
}
export default function timeCount(time) {
  let tmp = (Date.now() - Date.parse(time)) / 1000
  if(tmp < 60) {
    return `刚刚`
  }else if(tmp / 60 < 60){
    return `${Math.round(tmp / 60)}分钟前`
  }else if(tmp / 60 / 60 < 24) {
    return `${Math.round(tmp / 60 / 60)}小时前`
  }else if(tmp / 60 / 60 / 24 < 30){
    return `${Math.round(tmp / 60 / 60 / 24)}天前`
  }else if(tmp / 60 / 60 / 24 / 30 < 12){
    return `${Math.round(tmp / 60 / 60 / 24 / 30)}个月前`
  }else {
    return `${Math.round(tmp / 60 / 60 / 24 / 30 / 12)}年前`
  }
}
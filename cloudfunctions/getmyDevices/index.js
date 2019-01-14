// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
 try {
//     //Get userdata
//     const wxContext = cloud.getWXContext().openid
//     let useropenid = await wxContext
//     //get mydevices by userdata
   const db = cloud.database()
  let mydevices = await db.collection('devices').where({
    holding_open_id: event.userInfo.openId
     }).get();
    return mydevices
   } 
   catch (e) {
     console.log(e)
   }
}

// }
// exports.main = (event, context) => {
//   console.log(event)
//   console.log(context)

//   // 可执行其他自定义逻辑
//   // console.log 的内容可以在云开发云函数调用日志查看

//   // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）
//   const wxContext = cloud.getWXContext()
//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }

//   console.log(openid)
// }
// const db = cloud.database()

// //const wxContext = cloud.getWXContext().openid
// //let useropenid = await wxContext
//  exports.main = async (event, context) => db.collection('devices').where({
//    holding_open_id: event.userInfo.openId
//  }).get()
// const db = cloud.database({
//   env: 'test-f05377'
// })

// 云函数入口函数
// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()

//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
// }
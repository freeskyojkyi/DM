// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const matchResult = false
  const wxContext = cloud.getWXContext()
  try {
    //Get old holding Open Id
    let getDevice = await db.collection('devices').doc(event.deviceid).get();
    console.log(getDevice.data.holding_open_id)
   if (getDevice.data.holding_open_id == event.userInfo.openId) { 
     return true
     }else{
     return false
       }
    console.log(matchResult)
    //return matchResult
  } catch (e) {
    console.log(e)
  }
}
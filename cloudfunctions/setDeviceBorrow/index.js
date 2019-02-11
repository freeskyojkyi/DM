// 云函数入口文件
//Data{
  //description: String(optional),
  //deviceid: String | Number
  //operationtype: String | Number
  //}
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    //Get old holding Open Id
    let old = await db.collection('devices').doc(event.deviceid).get();
    //update history record
    let his = await db.collection('history')
      .add({
        data: {
          date: new Date().getTime(),
          description: event.description,
          deviceid: event.deviceid,
          operationtype: event.operationtype,
          userfrom: old.data.holding_open_id,
          userto: event.userInfo.openId
        }
      });
    //update the device record
    let ud = await db.collection('devices').doc(event.deviceid).update({
      data: {
        holding_open_id: event.userInfo.openId
      }
    });
    return his._id;
  }catch(e){console.log(e)
  }
}
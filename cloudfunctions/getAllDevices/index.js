// 旧getall云函数入口文件
// const cloud = require('wx-server-sdk')

// exports.main = (event, context) => {
//   console.log(event)
//   console.log(context)
// }

// cloud.init()
// const db = cloud.database()
// exports.main = async (event, context) => db.collection('devices').where({
// }).get()

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
})
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    let checkUser = await db.collection('user').field({
      nickname: true,
      openid: true
    }).get();
    let devicelist = await db.collection('devices').field({
      _id: true,
      device_name: true,
      holding_open_id: true,
      location_id: true,
      os: true,
    }).limit(50).get();
    // let checkTransactionType = await db.collection('operationtype').get();
    for (i = 0; i < devicelist.data.length; i++) {
      for (j = 0; j < checkUser.data.length; j++) {
        if (devicelist.data[i].holding_open_id == checkUser.data[j].openid) {
          devicelist.data[i].holding_open_id = checkUser.data[j].nickname
        }
      }
      // for (k = 0; k < checkTransactionType.data.length; k++) {
      //   if (devicelist.data[i].operationtype == checkTransactionType.data[k]._id) {
      //     devicelist.data[i].operationtype = checkTransactionType.data[k].operation
      //   }
      // }
    }
    return devicelist;
  } catch (e) {
    console.log(e)
  }
}
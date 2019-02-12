// // 云函数入口文件
// const cloud = require('wx-server-sdk')

// cloud.init({
// })
// const db = cloud.database()
// const _ = db.command
// exports.main = async (event, context) => db.collection('devices').where({
//   location_id: _.in(event.locationGroup)
// }).get()

// 云函数入口文件
// const cloud = require('wx-server-sdk')
// cloud.init()
// exports.main = async (event, context) => {
//   try {
//     const db = cloud.database()
//     const _ = db.command
//     let alldevices = await db.collection('devices').where({
//       location_id: _.in(event.locationGroup)
//     }).get();
//     return alldevices
//   }
//   catch (e) {
//     console.log(e)
//   }
// }

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
})
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  try {
    let checkUser = await db.collection('user').field({
      nickname: true,
      openid: true
    }).get();
    let devicelist = await db.collection('devices').where({
      location_id: _.in(event.locationGroup)
    }).field({
      _id: true,
      device_name: true,
      holding_open_id: true,
      location_id: true,
      os: true,
    }).limit(999).get();
    for (i = 0; i < devicelist.data.length; i++) {
      for (j = 0; j < checkUser.data.length; j++) {
        if (devicelist.data[i].holding_open_id == checkUser.data[j].openid) {
          devicelist.data[i].holding_open_id = checkUser.data[j].nickname
        }
      }
    }
    return devicelist;
  } catch (e) {
    console.log(e)
  }
}
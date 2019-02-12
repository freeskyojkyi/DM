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
const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  try {
    const db = cloud.database()
    const _ = db.command
    let alldevices = await db.collection('devices').where({
      location_id: _.in(event.locationGroup)
    }).get();
    return alldevices
  }
  catch (e) {
    console.log(e)
  }
}
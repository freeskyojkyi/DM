// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
})
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => db.collection('devices').where({
  location_id: _.in(event.locationGroup)
}).get()
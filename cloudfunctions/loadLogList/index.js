// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
})
const db = cloud.database()
exports.main = async (event, context) => db.collection('history').field({
  date: true,
  description: true,
  deviceid: true,
  operationtype: true,
  userfrom:true,
  userto:true
}).orderBy('date', 'desc')
  .get()
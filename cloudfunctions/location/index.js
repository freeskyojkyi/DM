

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event.id)
  return db.collection('location').get()
  //try {
  //   let testLocation = await db.collection('location').get(); 
  //   return testLocation;
  // } catch (e) {
  //   console.log(e)
  // }


}

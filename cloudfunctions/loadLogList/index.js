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
    let checkRecord = await db.collection('history').field({
      date: true,
      description: true,
      deviceid: true,
      operationtype: true,
      userfrom: true,
      userto: true 
    }).orderBy('date', 'desc').get();
    let checkTransactionType = await db.collection('operationtype').get();
    for (i = 0;i < checkRecord.data.length; i++){
      for (j = 0; j < checkUser.data.length; j++){
        if (checkRecord.data[i].userfrom == checkUser.data[j].openid){
          checkRecord.data[i].userfrom = checkUser.data[j].nickname
        } else if (checkRecord.data[i].userto == checkUser.data[j].openid){
          checkRecord.data[i].userto = checkUser.data[j].nickname
        }
      }
      for (k = 0; k < checkTransactionType.data.length; k++){
        if (checkRecord.data[i].operationtype == checkTransactionType.data[k]._id) {
          checkRecord.data[i].operationtype = checkTransactionType.data[k].operation
        }
      }
    }
    return checkRecord;
  } catch (e) {
    console.log(e)
  }
}
// exports.main = async (event, context) => db.collection('history').field({
//   date: true,
//   description: true,
//   deviceid: true,
//   operationtype: true,
//   userfrom:true,
//   userto:true 
// }).orderBy('date', 'desc')
//   .get()
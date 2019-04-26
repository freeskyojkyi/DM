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
<<<<<<< HEAD
    let locations = await db.collection('location').field({
      _id: true,
=======
    let checkLocation = await db.collection('location').field({
>>>>>>> a93c65892c8a2aac1c914af508ec84031aa2e410
      location: true
    }).get();
    let devicelist = await db.collection('devices').field({
      _id: true,
      device_name: true,
      holding_open_id: true,
      location_id: true,
      os: true,
    }).limit(999).get();
    for (i = 0; i < devicelist.data.length; i++) {
      for (j = 0; j < checkUser.data.length; j++) {
        // for (k = 0; k < checkUser.data.length; k++){
        if (devicelist.data[i].holding_open_id == checkUser.data[j].openid) {
          devicelist.data[i].holding_open_id = checkUser.data[j].nickname
        }
<<<<<<< HEAD
          // if (devicelist.data[i].location_id == locations.data[k]._id) {
          //   devicelist.data[i].location_id = locations.data[k].location
          // }
        // }
=======
        for (k = 0; k < checkLocation.data.length; k++) {
          if (devicelist.data[i].location_id == checkLocation.data[k]._id) {
            devicelist.data[i].location_id = checkLocation.data[k].location
          }
        }
>>>>>>> a93c65892c8a2aac1c914af508ec84031aa2e410
      }
    }
    return devicelist;
  } catch (e) {
    console.log(e)
  }
}
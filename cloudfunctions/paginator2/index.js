// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var dbName = event.dbName;
  var filter = event.filter ? event.pageIndex : null;
  var pageIndex = event.pageIndex ? event.pageIndex : 1;
  var pageSize = event.pageSize ?        event.pageSize : 300;
  var devicelist = ["1", "2", "test"];
  const countResult = await db.collection(dbName).where(filter).count()
  const total = countResult.total
  const totalPage = Math.ceil(total / 300)
  var hasMore;
  if (pageIndex > totalPage || pageIndex == totalPage) {
    hasMore = false;
  } else {
    hasMore = true;
  }

  try {
    let devicelist = await db.collection(dbName).where(filter).skip((pageIndex - 1) * pageSize).limit(pageSize).get();
    devicelist.hasMore = hasMore;
    console.log(devicelist);
    let checkUser = await db.collection('user').field({
      nickname: true,
      openid: true
    }).get();
    let checkLocation = await db.collection('location').field({
      location: true
    }).get();
    for (i = 0; i < devicelist.data.length; i++) {
      for (j = 0; j < checkUser.data.length; j++) {
        if (devicelist.data[i].holding_open_id == checkUser.data[j].openid) {
          devicelist.data[i].holding_open_id = checkUser.data[j].nickname
        }
        for (k = 0; k < checkLocation.data.length; k++) {
          if (devicelist.data[i].location_id == checkLocation.data[k]._id) {
            devicelist.data[i].location_id = checkLocation.data[k].location
          }
        }
      }
    }
    return devicelist;
  } catch (e) {
    console.log(e)
  }
}

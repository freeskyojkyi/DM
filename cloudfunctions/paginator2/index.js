// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var dbName = event.dbName;
  var filter = event.filter ? event.pageIndex : null;
  var pageIndex = event.pageIndex ? event.pageIndex : 1;
  var pageSize = event.pageSize ? event.pageSize : 10;
  var devicelist =["1","2","test"];
  const countResult = await db.collection(dbName).where(filter).count()
  const total = countResult.total
  const totalPage = Math.ceil(total / 10)
  var hasMore;
  if (pageIndex > totalPage || pageIndex == totalPage) {
    hasMore = false;
  } else {
    hasMore = true;
  }
  // return db.collection(dbName).where(filter).skip((pageIndex - 1) * pageSize).limit(pageSize).get().then(res => {
  //   res.hasMore = hasMore;
  //   devicelist = res;
  //   return devicelist;
  // })
  //console.log(devicelist)
  try {
    let devicelist = await db.collection(dbName).where(filter).skip((pageIndex - 1) * pageSize).limit(pageSize).get();
    devicelist.hasMore = hasMore;
    let checkUser = await db.collection('user').field({
      nickname: true,
      openid: true
    }).get();
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
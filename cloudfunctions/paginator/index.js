// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({})

// 云函数入口函数
exports.main = async (event, context) => {
  var dbName = event.dbName;
  var filter = event.filter ? event.pageIndex : null;
  var pageIndex = event.pageIndex ? event.pageIndex : 1;
  var pageSize = event.pageSize ? event.pageSize : 10;
  const countResult = await db.collection(dbName).where(filter).count()
  const total = countResult.total
  const totalPage = Math.ceil(total / 10)
  var hasMore;
  if (pageIndex > totalPage || pageIndex == totalPage) {
    hasMore = false;
  } else {
    hasMore = true;
  }
  return db.collection(dbName).where(filter).skip((pageIndex - 1) * pageSize).limit(pageSize).get().then(res => {
    res.hasMore = hasMore;
    return res;
  })
}
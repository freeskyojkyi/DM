// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var dbName = event.dbName;
  var filter = event.filter ? event.pageIndex : null;
  var pageIndex = event.pageIndex ? event.pageIndex : 1;
  var pageSize = event.pageSize ? event.pageSize : 100;
  var str1 = '';
  var str2 = '';
  var str3 = '';
  const countResult = await db.collection(dbName).where(filter).count()
  const total = countResult.total
  const totalPage = Math.ceil(total / 100)
  var hasMore;
  if (pageIndex > totalPage || pageIndex == totalPage) {
    hasMore = false;
  } else {
    hasMore = true;
  }
  var fulllist;
  try {
    let devicelist1 = await db.collection(dbName).where(filter).limit(100).get();
    if (devicelist1.data != undefined) {
      str1 = JSON.stringify(devicelist1.data); //将JSON对象转化为JSON字符
    }

    if (str1 != undefined) {

      str1 = str1.substr(1, str1.length - 2);
    }
    if (totalPage> 1){
for(i=0;i<totalPage;i++){
        var devicelist2 = await db.collection(dbName).where(filter).skip((i+1)*100).limit(100).get();
  if (devicelist2.data != undefined) {
    str2 = JSON.stringify(devicelist2.data); //将JSON对象转化为JSON字符
  }

  if (str2 != undefined) {

    str2 = str2.substr(1, str2.length - 2);
  }
  if ((str1 + str2) == undefined) {
    str3 = '[]';
  }
  else if ((str1 + str2) == '') {
    str3 = '[]';
  }
  else if (str1 == undefined) {
    str3 = '[' + str2 + ']';
  } else if (str1 == '') {
    str3 = '[' + str2 + ']';
  } else if (str2 == undefined) {
    str3 = '[' + str1 + ']';
  } else if (str2 == '') {
    str3 = '[' + str1 + ']';
  } else {
    str3 = '[' + str1 + ',' + str2 + ']';
  }
  str1 = str3;
  str1 = str1.substr(1, str1.length - 2);

    }
      console.log(str3)
      if (str3 != undefined) {

        var devicelist = JSON.parse(str3);
      }

    
    //let devicelist = await db.collection(dbName).get();

    //console.log(devicelist2);
    let checkUser = await db.collection('user').field({
      nickname: true,
      openid: true
    }).get();
    let checkLocation = await db.collection('location').field({
      location: true
    }).get();
    // for (i = 0; i < devicelist.data.length; i++) {
    //   for (j = 0; j < checkUser.data.length; j++) {
    //     if (devicelist.data[i].holding_open_id == checkUser.data[j].openid) {
    //       devicelist.data[i].holding_open_id = checkUser.data[j].nickname
    //     }
    //     for (k = 0; k < checkLocation.data.length; k++) {
    //       if (devicelist.data[i].location_id == checkLocation.data[k]._id) {
    //         devicelist.data[i].location_id = checkLocation.data[k].location
    //       }
    //     }
    //   }
    // }


    for (i = 0; i < devicelist.length; i++) {
      for (j = 0; j < checkUser.data.length; j++) {
        if (devicelist[i].holding_open_id == checkUser.data[j].openid) {
          devicelist[i].holding_open_id = checkUser.data[j].nickname
        }
        for (k = 0; k < checkLocation.data.length; k++) {
          if (devicelist[i].location_id == checkLocation.data[k]._id) {
            devicelist[i].location_id = checkLocation.data[k].location
          }
        }
      }
    }




    //由JSON字符串转换为JSON对象
      //devicelist.hasMore = hasMore;
      return devicelist;
    } else { return [{}]; }
    //return str1;
  } catch (e) {
    console.log(e)
  }
}

//index.js
const app = getApp()

Page({
  data: {

  },

  onLoad: function() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  
    // 调用云函数获取openid
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
    var nthis = this
    // 本地函数，已经改用云函数
    // const db = wx.cloud.database({
    //   env: 'test-f05377'
    // })
    // db.collection('devices').where({
    //   holding_open_id: app.globalData.openid
    // }).field({
    //   _id:true,name:true,os:true
    // }).get({
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getmyDevices',
      // 传给云函数的参数
      data: {
      },
      success: res => {
        console.log(res)
        nthis.setData({
          mydevices: res.result.data,
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
    var nthis = this
    // 本地函数，已经改用云函数
    // const db = wx.cloud.database({
    //   env: 'test-f05377'
    // })
    // db.collection('devices').where({
    //   holding_open_id: app.globalData.openid
    // }).field({
    //   _id:true,name:true,os:true
    // }).get({
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getAllDevices',
      // 传给云函数的参数
      data: {
      },
      success: res => {
        console.log(res)
        nthis.setData({
          alldevices: res.result.data,
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  // onGetUserInfo: function(e) {
  //   if (!this.logged && e.detail.userInfo) {
  //     this.setData({
  //       logged: true,
  //       avatarUrl: e.detail.userInfo.avatarUrl,
  //       userInfo: e.detail.userInfo
  //     })
  //   }
  // },

  // onGetOpenid: function() {
  //   // 调用云函数
  //   wx.cloud.callFunction({
  //     name: 'login',
  //     data: {},
  //     success: res => {
  //       console.log('[云函数] [login] user openid: ', res.result.openid)
  //       app.globalData.openid = res.result.openid
  //       wx.navigateTo({
  //         url: '../userConsole/userConsole',
  //       })
  //     },
  //     fail: err => {
  //       console.error('[云函数] [login] 调用失败', err)
  //       wx.navigateTo({
  //         url: '../deployFunctions/deployFunctions',
  //       })
  //     }
  //   })
  // },

  //本地版get all devices
  // allDevices: function () {
  //   const db = wx.cloud.database({
  //    env: 'test-f05377'
  //   })
  //   db.collection('devices').get({
  //     success: res => {
  //       this.setData({
  //         alldevices: res.data
  //       })
  //       console.log('[数据库] [查询记录] 成功: ', res)
  //     },
  //     fail: err => {
  //       wx.showToast({
  //         icon: 'none',
  //         title: '查询记录失败'
  //       })
  //       console.error('[数据库] [查询记录] 失败：', err)
  //     }
  //   })
  // },
    // myDevice: function () {
    //   var nthis = this
    // 本地函数，已经改用云函数
    // const db = wx.cloud.database({
    //   env: 'test-f05377'
    // })
    // db.collection('devices').where({
    //   holding_open_id: app.globalData.openid
    // }).field({
    //   _id:true,name:true,os:true
    // }).get({
  //     wx.cloud.callFunction({
  //       // 云函数名称
  //       name: 'getmyDevices',
  //       // 传给云函数的参数
  //       data: {
  //       },
  //     success: res => {
  //       console.log(res)
  //       nthis.setData({
  //         mydevices: res.result.data,
  //       })
  //       console.log('[数据库] [查询记录] 成功: ', res)
  //     },
  //     fail: err => {
  //       wx.showToast({
  //         icon: 'none',
  //         title: '查询记录失败'
  //       })
  //       console.error('[数据库] [查询记录] 失败：', err)
  //     }
  //   })
  // },

  // allDevices: function () {
  //   var nthis = this
  //   // 本地函数，已经改用云函数
  //   // const db = wx.cloud.database({
  //   //   env: 'test-f05377'
  //   // })
  //   // db.collection('devices').where({
  //   //   holding_open_id: app.globalData.openid
  //   // }).field({
  //   //   _id:true,name:true,os:true
  //   // }).get({
  //   wx.cloud.callFunction({
  //     // 云函数名称
  //     name: 'getAllDevices',
  //     // 传给云函数的参数
  //     data: {
  //     },
  //     success: res => {
  //       console.log(res)
  //       nthis.setData({
  //         mydevices: res.result.data,
  //       })
  //       console.log('[数据库] [查询记录] 成功: ', res)
  //     },
  //     fail: err => {
  //       wx.showToast({
  //         icon: 'none',
  //         title: '查询记录失败'
  //       })
  //       console.error('[数据库] [查询记录] 失败：', err)
  //     }
  //   })
  // },
})

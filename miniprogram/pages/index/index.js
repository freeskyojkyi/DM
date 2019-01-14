//index.js
const app = getApp()

Page({
  data: {

  },

  onLoad: function() {

    var nthis = this

    wx.cloud.callFunction({
      // 获取我的设备
      name: 'getmyDevices',
      // 传给云函数的参数
      data: {
      },
      success: res => {
        console.log(res)
        nthis.setData({
          mydevices: res.result.data,
        })
        console.log('[数据库] [查询mydevices] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询mydevices失败'
        })
        console.error('[数据库] [查询mydevices] 失败：', err)
      }
    })

    wx.cloud.callFunction({
      // 获取全部设备
      name: 'getAllDevices',
      // 传给云函数的参数
      data: {
      },
      success: res => {
        console.log(res)
        nthis.setData({
          alldevices: res.result.data,
        })
        console.log('[数据库] [查询alldevices] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询alldevices失败'
        })
        console.error('[数据库] [查询alldevices] 失败：', err)
      }
    })
  },
  
})

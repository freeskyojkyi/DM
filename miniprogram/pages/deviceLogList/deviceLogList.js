// miniprogram/pages/deviceLogList/deviceLogList.js
const time = require("../../utlis/timeutlis.js");
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkSummary: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thispage = this
    var navH
    this.setData({
      navH: app.globalData.navHeight,
    })
    //const scene = decodeURIComponent(options.path)
    //console.log(options.id)
    var start = new Date().getTime()
    wx.cloud.callFunction({
      // 云函数名称
      name: 'loadLogList',

      // 传给云函数的参数
      data: {
      },
      success(res) {
        //create by yippee on 17Feb 时间戳转化为年 月 日 时 分 秒
        // console.log('cost：：：' + (new Date().getTime() - start))
        // console.log
        console.log(JSON.stringify(res.result))
        var datas = res.result.data
        for (var i = 0; i < datas.length; i++) {
          // datas[i].date = time.tsFormatTime(datas[i].date, 'Y-M-D h:m:s')
          datas[i].date = time.tsFromatTime(datas[i].date, 'Y-M-D h:m:s')

        }
          checkSummary:datas
        console.log(res.result)
        thispage.setData({
          checkSummary: res.result.data,
        })
      },
      fail: console.error
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  backEvent: function () {
    var cps = getCurrentPages();
    if (cps.length < 2) {
      wx.navigateTo({
        url: '../index_landing/index'
      })
    } else if (cps[cps.length - 2].route == "pages/index_landing/index") {
      wx.navigateBack({
        delta: 1
      })
    } else {
      wx.navigateTo({
        url: '../index_landing/index'
      })
    }
  }
})
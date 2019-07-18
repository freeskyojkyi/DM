var app = getApp();

// pages/entrance/entrance.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qr : "n",
    id : ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.qr)
    if (options.qr) {
      this.data.qr = options.qr,
      this.data.id = options.id
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var app = getApp();
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

   goToDeviceList: function (e) {
     //console.log(this.data.qr)
     if (this.data.qr=="y") {
       if (e.detail.userInfo) {
       wx.navigateTo({
         url: '../deviceInfo/deviceInfo?qr=y&id=' + this.data.id
       })
       }
     } else {
       if (e.detail.userInfo) {
    wx.navigateTo({
      url:'../index_landing/index'
    })
    }
       wx.getUserInfo({
         success: function (res) {
           app.globalData.operatorInfo = res.userInfo.nickName
         }
       })
  }
  }
})
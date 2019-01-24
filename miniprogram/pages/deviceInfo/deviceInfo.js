// pages/deviceInfo/deviceInfo.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {    
    name_title_en: 'DEVICE NAME',
    name_title_ch: '名字',
    name: 'Loading',

    os_title_en: 'SYSTEM',
    os_title_ch: '系统',
    os: 'Loading',

    borrow_button_name: 'Scan',
    borrow_button_label: '借机',

    return_button_name: 'Return',
    return_button_label: '还机',

    scan_icon: 'cloud://test-f05377.7465-test-f05377/resources/icons/scan_white.png',
    return_icon: 'cloud://test-f05377.7465-test-f05377/resources/icons/in_white.png',

    // pic_default:'cloud://test-f05377.7465-test-f05377/resources/images/default_pic_iphonexmax.png',
    pic_default: '',
    mode: 'aspectFit',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var url

    wx.cloud.callFunction({
      // 云函数名称
      name: 'getDeviceInfo',
      // 传给云函数的参数
      data: {
        id: options.id,
      },
      success(res) {
        if(res.result.data.pic_url != undefined && res.result.data.pic_url != "")
        {
          url = "cloud://test-f05377.7465-test-f05377/resources/device_image/"+ res.result.data.pic_url
        }
        else
        {
          url = 'cloud://test-f05377.7465-test-f05377/resources/images/default_pic_iphonexmax.png'
        }

        that.setData({
          name: res.result.data.device_name,
          os: res.result.data.os,
          pic_default: url,
        })
      },
      fail(e) {
        console.log(e)
        wx.showModal({
          title: '提示',
          content: '找不到详细资料，请稍后再尝试',
          showCancel: false,
          success(res) {
            wx.navigateBack({
              delta: 2
            })
          }
        })
      },
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

  }
})
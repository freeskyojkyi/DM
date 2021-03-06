const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  //se
  data: {
    locationdata: [],
   // disabled: false,
   
  },

  chkboxChange:function(e){
    console.log(e.detail.value)

  },
  //click submit button
  submit: function(e) {

    var valueobject = e.detail.value
     
    console.log(valueobject.selectedlocation)
    if (!valueobject.selectedlocation || valueobject.selectedlocation.length==0){
      wx.showModal({
        title: 'Alert Message',
        showCancel:false,
        content: 'Please select any one of locations!',
        confirmText:'Confirm'
      })
      return
    }
    else{
      //var valueobject = e.detail.value

      var parameter = JSON.stringify(valueobject.selectedlocation)

        wx.redirectTo({
          url: "../index_landing/index?location=" + parameter
        })
    }

  },
  //click reset button
  resetbtn() {
    var locationdata = this.data.locationdata
    for (var i = 0; i < locationdata.length; i++) {
      locationdata[i].checked = undefined

    }
    this.setData({
      locationdata: locationdata
    })
  },


  /**
   * 生命周期函数--监听页面加载
  //  */



  onLoad: function(options) {
    console.log('onload.......')
    var thispage = this
    var navH
    this.setData({
      navH: app.globalData.navHeight,
    })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'location',

      // 传给云函数的参数
      data: {},
      success(res) {

        console.log(JSON.stringify(res.result))
        console.log(res.result)
        thispage.setData({
          locationdata: res.result.data

        })
      },
      fail: console.error
    })

  },
  // /
  //    * 生命周期函数--监听页面初次渲染完成
  //    */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  backEvent: function() {
    wx.navigateBack({})
    console.log("click back")
  }

});
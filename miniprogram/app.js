//app.js
App({
  onLaunch: function (options) {
    var that = this
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      //  env: 'test-f05377'
      })
      //console.log(options.query)
      if (options.query.qr) {
        wx.getSetting({
          success: function (res) {
            if (!res.authSetting['scope.userInfo']) {
              wx.navigateTo({
                url: "../entrance/entrance?qr=y&id=" + options.query.id
              })
            } else { }
          },
        })
        } else{
      wx.getSetting({
        success: function (res) {
          if (!res.authSetting['scope.userInfo']){
            wx.navigateTo({
              url: "../entrance/entrance",
            })
          }else{}
        },
      })
    }
    }
    
    
    this.globalData = {
      operatorInfo: null
    }
  }

})

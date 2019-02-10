//index.js
const app = getApp()

Page({
  data: {
    //参数信息
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    grade_name: '--请选择Device Group--',
    currentTab: 0,
    borrow_button_name: 'Scan',
    borrow_button_label: '借机',
    log_button_name: 'Log',
    log_button_label: '日志',
    return_button_name: 'Return',
    return_button_label: '还机',
    scan_icon: 'cloud://test-f05377.7465-test-f05377/resources/icons/scan_white.png',
    return_icon: 'cloud://test-f05377.7465-test-f05377/resources/icons/in_white.png',
    log_icon: 'cloud://test-f05377.7465-test-f05377/resources/icons/log_icon.png',

    //added checkbox value
    items: [
      { name: 'group A', value: 'Group A ' },
      { name: 'group B', value: 'Group B', checked: 'true' },
      { name: 'group C', value: 'Group C', checked: 'true' },
      { name: 'group D', value: 'Group D' },
      { name: 'group E', value: 'Group E' },
      { name: ' others', value: ' Others ' },
    ],
    checkboxChange(e) {
      console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    },
    
//navigation bar information
    navData: [
      {
        text: '机器列表'
      },
      {
        text: '未借出机器'
      },

    ],
    
},
   
  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 2;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },
  
  /**
 *  点击下拉框
 */
  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },
  /**
   * 已选下拉框
   */
  mySelect(e) {
    console.log(e)
    var name = e.currentTarget.dataset.name
    this.setData({
      grade_name: name,
      select: false
    })
  },
 
  //pull down to refresh page to show my devices
  onPullDownRefresh: function () {
    this.onLoad()
  },
  onLoad: function (options) {
    var that = this
    if (app.globalData.operatorInfo){} else{
      //console.log("not yet has userinfo")
      wx.getUserInfo({
        success: function (res) {
          app.globalData.operatorInfo = res.userInfo.nickName
        }
      })
    }
    wx.cloud.callFunction({
         // 获取我的设备
      name: 'getmyDevices',
         // 传给云函数的参数
      data: {
         },
      success: res => {
        console.log(res)
        that.setData({
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
           that.setData({ 
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
  
  gotoDeviceInfo: function(e) {
    wx.navigateTo({
      url: "../deviceInfo/deviceInfo?id=" + e.currentTarget.dataset.id,
    })
  },

  returnThisDevice: function (e) {
    wx.navigateTo({
      url: "../deviceInfo/deviceInfo?id=" + e.currentTarget.dataset.id + "&qr=y",
    })
  },

  returnAllDevice: function (e) {
    if (app.globalData.operatorInfo) { } else {
      //console.log("not yet has userinfo")
      wx.getUserInfo({
        success: function (res) {
          app.globalData.operatorInfo = res.userInfo.nickName
        }
      })
    }
    wx.cloud.callFunction({
      name: 'returnAllDevice',
      data: {
        returnTo: "GZAdmin",
        operationtype: 1,
        operatorNickname: app.globalData.operatorInfo
      },
      success(res) {
        wx.showToast({
          title: "Confirmed",
          icon: 'success',
          duration: 3000
        })
        wx.navigateTo({
          url: "../index_landing/index",
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      },
      fail: console.error
    })
  },

  getDevice: function (e) {
    console.log("This is getDevice")
    console.log(e.currentTarget.dataset.id)

    wx.cloud.callFunction({
      // 云函数名称
      name: 'getDeviceInfo',
      // 传给云函数的参数
      data: {
        "id": e.currentTarget.dataset.id,
      },
      success(res) {
        console.log(res)
        wx.navigateTo({
          url: "../deviceInfo/deviceInfo?id=" + e.currentTarget.dataset.id,
        })
      },
      fail()
      {
        wx.showModal({
          title: '提示',
          content: '找不到详细资料，请稍后再尝试',
          showCancel:false, 
        })
      },
    })
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.getUserInfo({
        success: function (res) {
          console.log('用户信息', res.userInfo)
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },


  getLogList:function(e){
    if (e.detail.userInfo) {
      wx.navigateTo({
              url: "../deviceLogList/deviceLogList",
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
    }
  },

  borrowDevice: function (e) {
    if (e.detail.userInfo) {
      var that = this;
      var show; 
      wx.scanCode({
        success: (res) => {
          //const scene = decodeURIComponent(res.result.scene)
         console.log(res.path),
          //if (res.result.indexOf("data") != -1) {
            //app.globalData.cResult = res.result.slice(7);
            //if (app.globalData.operatorInfo == undefined) {
              //wx.getUserInfo({
                //success: function (res2) {
                  //console.log(res2.userInfo.nickName)
                 // app.globalData.operatorInfo = res2.userInfo.nickName
                  //console.log(app.globalData.operatorInfo)
                //}
              //})
            //}
            //wx.navigateTo({
              //url: "../addFunction/addFunction?id=" + "NA",
              //success: function (res) { },
              //fail: function (res) { },
              //complete: function (res) { },
            //})
            wx.showToast({
              title: '扫码成功',
              icon: 'success',
              duration: 2000
            })
          if (res.path) {
            console.log(res.path)
            wx.navigateTo({
              url: '/'+res.path})
              }else{
            wx.showToast({
              title: "无效二维码",
              icon: 'none',
              duration: 2000
            })
              }
          //} else {
            //wx.showToast({
              //title: "无效DMS二维码",
              //icon: 'none',
              //duration: 2000
           // })
          //}
        },
        fail: (res) => {
          wx.showToast({
            title: "扫码失败",
            icon: 'none',
            duration: 2000
          })
        },
        complete: (res) => {
        }
      }) 
    }else{}
  }
})
  

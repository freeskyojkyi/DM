//index.js
const app = getApp()

Page({
  data: {
    //参数信息
    pageIndex: 1,
    pageSize: 10,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    grade_name: '--请选择Device Group--',
    currentTab: 0,
    borrow_button_name: 'Scan',
    borrow_button_label: 'Borrow',
    log_button_name: 'Log',
    log_button_label: 'Log',
    return_button_name: 'Return',
    return_button_label: 'Return',
    scan_icon: 'cloud://test-f05377.7465-test-f05377/resources/icons/scan_white.png',
    return_icon: 'cloud://test-f05377.7465-test-f05377/resources/icons/in_white.png',
    log_icon: 'cloud://test-f05377.7465-test-f05377/resources/icons/log_icon_hollowout_white.png',
    device_locale_icon: 'cloud://test-f05377.7465-test-f05377/resources/icons/device-locale-icon.png',
    my_device_icon: 'cloud://test-f05377.7465-test-f05377/resources/icons/my-device-icon.png',
    all_device_icon: 'cloud://test-f05377.7465-test-f05377/resources/icons/all-device-icon.png',

    placeholder_search: "Please input keywords",
    my_device_label: 'Hand',
    all_device_label: 'Store',
    device_locale_label: 'Locales',

    locales_visible: false,

    top: 0,

    all_data_devices: ['123', '222'],
    my_data_devices: '???',
    my_data_devices: 'default',

    //added checkbox value
    items: [{
        name: '0',
        value: 'Group A'
      },
      {
        name: '1',
        value: 'Group B'
      },
      {
        name: '2',
        value: 'Group C'
      },
      {
        name: '3',
        value: 'Group D'
      },
      {
        name: '4',
        value: 'Group E'
      },
      {
        name: 'others',
        value: ' Others'
      },
    ],


    //navigation bar information
    navData: [{
        text: '机器列表'
      },
      {
        text: '未借出机器'
      },

    ],
  },

  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    wx.cloud.callFunction({
      // 获取全部设备
      name: 'getLocationDevices',
      // 传给云函数的参数
      data: {
        locationGroup: e.detail.value,
      },
      success: res => {
        console.log(res)
        this.setData({
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
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
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
  onPullDownRefresh: function() {
    this.onLoad()
  },

  onLoad: function(options) {
    var that = this

    if (app.globalData.operatorInfo) {} else {
      //console.log("not yet has userinfo")
      wx.getUserInfo({
        success: function(res) {
          app.globalData.operatorInfo = res.userInfo.nickName
        }
      })
    }
    // wx.cloud.callFunction({
    //      // 获取我的设备
    //   name: 'getmyDevices',
    //      // 传给云函数的参数
    //   data: {
    //      },
    //   success: res => {
    //     console.log(res)
    //     that.setData({
    //       mydevices: res.result.data,
    //     })
    //     console.log('[数据库] [查询mydevices] 成功: ', res)
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '查询mydevices失败'
    //     })
    //     console.error('[数据库] [查询mydevices] 失败：', err)
    //   }
    // })

    wx.cloud.callFunction({
<<<<<<< HEAD
      // 获取全部设备'getAllDevices',分页请求'paginator2'
=======
      // 获取全部设备
>>>>>>> c5558e7d670b99279cbdf3ee567d13cb13bf8c9d
      name: 'getAllDevices',
      // 传给云函数的参数
      data: {
        // dbName:"devices",
        // pageIndex:1,
        // pageSize:10,
      },
      success: res => {
        console.log(res)
        let fullset = res.result.data
        //console.log(fullset)
        var holding = []
        for (var i = 0; i < fullset.length; i++) {
          if (fullset[i].holding_open_id == app.globalData.operatorInfo) {
            holding.push(fullset[i])

            //删除已借机器
            fullset.splice(i, 1)
            i--
          }
        }
        console.log(res)
       // console.log(res)
        this.setData({
          alldevices: fullset,
          mydevices: holding,
        })
        that.setData({
          all_data_devices: fullset,
          my_data_devices: holding,
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

  /**
 * 上拉分页
 */
  onReachBottom: function () {
//调试中
  //   //上拉分页,将页码加1，然后调用分页函数loadRoom()
  //   var that = this;
  //   var pageNumber = that.data.pageNumber;
  //   that.setData({
  //     pageNumber: ++pageNumber
  //   });

  //   setTimeout(function () {
  //     wx.showToast({
  //       title: '加载中..',
  //     }),
  //       that.loadRooms();
  //     that.setData({
  //       title: "数据加载完毕"
  //     })
  //   }, 1000)
  },

  gotoDeviceInfo: function(e) {
    wx.navigateTo({
      url: "../deviceInfo/deviceInfo?id=" + e.currentTarget.dataset.id,
    })
  },

  returnThisDevice: function(e) {
    var that = this
    console.log(e)
    if (e.detail.userInfo) {
      wx.cloud.callFunction({
        name: 'ownByMe',
        data: {
          deviceid: e.currentTarget.dataset.id,
        },
        success(res) {
          //console.log(res)
          if (res.result) {
            //pop up to start return flow
            wx.showModal({
              title: 'Return Device?',
              content: 'You are already holding device ID =' + e.currentTarget.dataset.id + '. Are you want to Return Device?',
              confirmText: 'Confirm',
              cancelText: 'Cancel',
              success: function(res) {
                if (res.confirm) {
                  console.log("确定还机")
                  wx.cloud.callFunction({
                    name: 'setDeviceReturn',
                    data: {
                      deviceid: e.currentTarget.dataset.id,
                      returnTo: "GZAdmin",
                      operationtype: 1,
                      operatorNickname: e.detail.userInfo.nickName
                    },
                    success(res) {
                      wx.showToast({
                        title: "Confirmed",
                        icon: 'success',
                        duration: 3000
                      })
                      wx.navigateTo({
                        url: "../index_landing/index",
                        success: function(res) {},
                        fail: function(res) {},
                        complete: function(res) {},
                      })
                    },
                    fail: console.error
                  })
                }
              }
            })
          } else {
            //pop up to start borrow flow
            wx.showModal({
              title: 'ERROR',
              content: 'You are not currently holding this device!',
              confirmText: 'OK',
              showCancel: false,
              success: function(res) {
                if (res.confirm) {} else {
                  console.log("取消")
                }
              }
            })
          }
        },
        fail: console.error
      })
    } else {}
  },

  returnAllDevice: function(e) {
    // if (app.globalData.operatorInfo) { } else {
    //   //console.log("not yet has userinfo")
    //   wx.getUserInfo({
    //     success: function (res) {
    //       app.globalData.operatorInfo = res.userInfo.nickName
    //     }
    //   })
    // }
    var that = this
    if (e.detail.userInfo) {
      wx.showModal({
        title: 'Return Device?',
        content: 'You are going to return all devices you currently holding',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
        success: function(res) {
          if (res.confirm) {
            console.log("确定还ALL机")
            wx.cloud.callFunction({
              name: 'returnAllDevice',
              data: {
                returnTo: "GZAdmin",
                operationtype: 1,
                operatorNickname: e.detail.userInfo.nickName
              },
              success(res) {
                if (res.result == 0) {
                  console.log("result is 0")
                  wx.showModal({
                    title: 'ERROR',
                    content: 'You dont have any device holding currently',
                    confirmText: 'Confirm',
                    showCancel: false,
                    success: function(res) {
                      if (res.confirm) {}
                    }
                  })
                } else {
                  wx.showModal({
                    title: 'Confirmation',
                    content: 'Successfully returned device ID:' + res.result,
                    confirmText: 'Confirm',
                    showCancel: false,
                    success: function(res) {
                      if (res.confirm) {
                        that.onLoad()
                      }
                    }
                  })

                }
              },
              fail: console.error
            })
          } else {
            console.log("取消")
          }
        }
      })
    } else {}
  },

  getDevice: function(e) {
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
      fail() {
        wx.showModal({
          title: '提示',
          content: '找不到详细资料，请稍后再尝试',
          showCancel: false,
        })
      },
    })
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.getUserInfo({
        success: function(res) {
          console.log('用户信息', res.userInfo)
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
          that.setData({
            nickname: userInfo.nickName
          })
        }
      })
    }
  },

  getLogList: function(e) {
    if (e.detail.userInfo) {
      wx.navigateTo({
        url: "../deviceLogList/deviceLogList",
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },

  borrowDevice: function(e) {
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
              url: '/' + res.path
            })
          } else {
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
        complete: (res) => {}
      })
    } else {}
  },

  swipe_to_return_device: function(e) {
    var that = this
    wx.showModal({
      title: 'Return Device?',
      content: 'You are already holding device #' + e.currentTarget.dataset.id + '. Are you want to Return Device?',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      success: function(res) {
        if (res.confirm) {
          console.log("确定还机")
          wx.cloud.callFunction({
            name: 'setDeviceReturn',
            data: {
              deviceid: e.currentTarget.dataset.id,
              returnTo: "GZAdmin",
              operationtype: 1,
              operatorNickname: app.globalData.operatorInfo,
            },
            success(res) {
              wx.showToast({
                  title: "Confirmed",
                  icon: 'success',
                  duration: 3000
                }),
                that.onLoad()
            },
            fail(e) {
              console.error
            }
          })
        }
      }
    })
  },

  swipe_to_borrow_device: function(e) {
    var that = this
    wx.cloud.callFunction({
      name: 'ownByMe',
      data: {
        deviceid: e.currentTarget.dataset.id,
      },
      success(res) {
        //console.log(res)
        if (res.result) {
          //pop up to start return flow
          wx.showModal({
            title: 'ERROR',
            content: 'You are already holding this device!',
            confirmText: 'OK',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {}
            }
          })
        } else {
          //pop up to start borrow flow
          wx.showModal({
            title: 'Borrow Device?',
            content: 'Are you confirm to borrow device #' + e.currentTarget.dataset.id + '?',
            confirmText: 'Confirm',
            cancelText: 'Cancel',
            success: function(res) {
              if (res.confirm) {
                console.log("确定借机")
                wx.cloud.callFunction({
                  name: 'setDeviceBorrow',
                  data: {
                    deviceid: e.currentTarget.dataset.id,
                    operationtype: 0,
                    operatorNickname: app.globalData.operatorInfo
                  },
                  success(res) {
                    wx.showToast({
                        title: "Confirmed",
                        icon: 'success',
                        duration: 3000
                      }),
                      that.onLoad()
                  },
                  fail: console.error
                })
              } else {
                console.log("取消")
              }
            }
          })
        }
      },
      fail: console.error
    })
  },

  onShareAppMessage: function() {
    return {
      title: '点机坊', // 转发后 所显示的title
      path: '/pages/index_landing/index'
    }
  },

  onClose(event) {
    const {
      position,
      instance
    } = event.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          instance.close();
        });
        break;
    }
  },

  locales_visible_change: function() {
    this.setData({
      locales_visible: true
    })
  },

  locales_hidden_change: function() {
    this.setData({
      locales_visible: false
    })
  },

  disable_touch_move: function() {

  },

  scrollTopFun(e) {
    let that = this;
    that.top = e.detail.scrollTop;
    console.log(e)
    that.$apply();
  },

  onSearch: function(e) {
    // my_data_devices - 我的设备 
    // all_data_devices - 所有设备
    // my_search_devices - 我的查询设备
    // all_search_devices - 所有的查询设备
    // search critiria - e.detail
    var that = this
    var search_scope

    //格式化查询条件并以空格分离查询条件 
    var search_condition = e.detail.replace(/\s+/g, ' ').replace(/(^\s*)|(\s*$)/g, "").split(' ')

    var my_search_devices
    var all_search_devices
    var able_To_push

    //初始化数据
    that.setData({
      my_search_devices: [],
      all_search_devices: [],
    })

    for (var i = 0; i < that.data.my_data_devices.length; i++) {
      search_scope = (that.data.my_data_devices[i]._id + ',' +
        that.data.my_data_devices[i].device_name + ',' +
        that.data.my_data_devices[i].holding_open_id).toLowerCase();

      able_To_push = true;

      for (var j = 0; j < search_condition.length; j++) {
        if (search_scope.indexOf(search_condition[j].toLowerCase()) == "-1") {
          able_To_push = false;
          j++;
        }
      };

      if (able_To_push) {
        that.data.my_search_devices.push(that.data.my_data_devices[i])
      }
    }

    for (var i = 0; i < that.data.all_data_devices.length; i++) {
      search_scope = (that.data.all_data_devices[i]._id + ',' +
        that.data.all_data_devices[i].device_name + ',' +
        that.data.all_data_devices[i].holding_open_id).toLowerCase()

      able_To_push = true;

      for (var j = 0; j < search_condition.length; j++) {
        if (search_scope.indexOf(search_condition[j].toLowerCase()) == "-1") {
          able_To_push = false;
          j++;
        }
      };

      if (able_To_push) {
        that.data.all_search_devices.push(that.data.all_data_devices[i])
      }
    }

    //刷新列表
    that.setData({
      mydevices: that.data.my_search_devices,
      alldevices: that.data.all_search_devices
    })
  },

  onCancel:function(){
    this.setData({
      alldevices: this.data.all_data_devices,
      mydevices: this.data.my_data_devices
    })
  }
})
//index.js
const app = getApp()

Page({
  data: {
    //参数信息
    select: false,
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
  onLoad: function () {

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
     }
  
})
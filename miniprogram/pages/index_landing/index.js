//index.js
const app = getApp()

Page({
  data: {
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
    select: false,
    grade_name: '--请选择Device Group--',

    navData: [
      {
        text: '机器列表'
      },
      {
        text: '未借出机器'
      },

    ],
    currentTab: 0,

    log_name: '日志',
    lDevice_name: '借机',
    rDevice_name: '还机',
    kDevice_name: '持有',
    scan_icon: 'https://7465-test-f05377-1258443323.tcb.qcloud.la/resources/images/scanQR.png',
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
  onLoad: function (options) {

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
  }

})

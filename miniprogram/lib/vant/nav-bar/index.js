import { VantComponent } from '../common/component';
const App = getApp();
VantComponent({
  classes: ['title-class'],
  props: {
    title: String,
    fixed: Boolean,
    leftText: String,
    rightText: String,
    leftArrow: Boolean,
    border: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 1
    },

    navH:{
      type: Number,
      value: App.globalData.navHeight - 46
    }
  },


  methods: {
    onClickLeft: function onClickLeft() {
      this.$emit('click-left');
    },
    onClickRight: function onClickRight() {
      this.$emit('click-right');
    }
  }
  // lifetimes:{
  //   attached:function() {
  //     this.setDada({
  //       navH: App.globalData.navHeight
  //     })
  //   }
  // }
});
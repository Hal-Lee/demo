//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hi 你要去哪？',
    userInfo: {},
    appInfo:{
      logoUrl:'../../image/logo.png',
      title:'我的位置'
    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../location/location'
    })
  },
  onLoad: function () {
    var that = this
    that.setData({
        appInfo:this.data.appInfo
    })
  }
})

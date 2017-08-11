//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    isunread:true,
    unreadNum:2,
    image:["../../images/pay.png","../../images/pack.png","../../images/deliver.png","../../images/history.png"],
    userInfo: {}
  },
  
  gotoorder:function(e){
    console.log('gotopage' + e.currentTarget.dataset.index)
    wx.navigateTo({
      url: '../order/order?page=' + e.currentTarget.dataset.index,
    })
  },
  onLoad: function () {

    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      console.log(userInfo)
      that.setData({
        userInfo:userInfo
      })
    })
  }
  ,
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: '万和酒水小程序商城',
      path: '/pages/Home/Home',
      success: function (res) {
        wx.showToast({
          title: '转发成功',
          duration: 500
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '转发失败',
          image: '../../images/sad.png',
          duration: 500
        })
      }
    }
  }

})

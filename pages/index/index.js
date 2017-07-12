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

})

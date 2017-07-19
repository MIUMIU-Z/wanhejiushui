// pages/order/order.js
var app=getApp()
Page({

  data: {
    myorders: [],
    select:-1,
    num:0,
    page:0
  },
  changepage:function(e){
    var that = this
    that.setData({
      page: e.target.dataset.index,
    })
    wx.request({
      url: app.data.imgRoute + '/shop/search_order_info',
      data: {
        user_id: app.data.userid
      },
      method: 'GET',
      success: function (res) {
        console.log('订单列表', res)
        var sub = 0
        for (var i = 0; i < res.data.infos.length; i++) {
          if (res.data.infos[i].state < 4)
            sub = sub + 1

        }
        that.setData({
          myorders: res.data.infos,
          num: sub
        })
      }
    })
  },
  gotodetail:function(e){
    wx.setStorage({
      key: 'selectedorder',
      data: this.data.myorders[e.currentTarget.dataset.index],
    })
    wx.navigateTo({
      url: '../orderdetail/orderdetail',
    })
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      imgRoute: app.data.imgRoute
    })
  },

  onReady: function () {
  
  },


  onShow: function () {
    var that =this
    wx.request({
    url: app.data.imgRoute+'/shop/search_order_info',
      data: {
        user_id:app.data.userid
      },
      method: 'GET',
      success: function (res) {
        console.log('订单列表',res)
        var sub = 0
        for (var i = 0; i < res.data.infos.length; i++) 
        {
          if (res.data.infos[i].state < 4)
            sub = sub + 1

        }
        that.setData({
          myorders: res.data.infos,
          num: sub
        })
      }
    })
  },


  onHide: function () {
  
  },


  onUnload: function () {
  
  },


  onPullDownRefresh: function () {
    var that = this

  },


  onReachBottom: function () {
  
  },


  onShareAppMessage: function () {
  
  }
})
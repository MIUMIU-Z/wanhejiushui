// pages/order/order.js
var app=getApp()
Page({

  data: {
    myorders: [],
    select:-1,
    num:-1,
    page:0
  },
  changepage:function(e){
    var sub = 0
    for (var i = 0; i < this.data.myorders.length;i++)
    {
      if (this.data.myorders[i].order.setstate==0)
        sub = sub+1
    }
    if (e.target.dataset.index==1)
    {
      sub = this.data.myorders.length-sub
    } 
    this.setData({
      page: e.target.dataset.index,
      num:sub,
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
          if (res.data.infos[i].state == 1)
            sub = sub + 1
          that.setData({
            myorders: res.data.infos.reverse(),
            num: sub
          })
        }
      }
    })
  },


  onHide: function () {
  
  },


  onUnload: function () {
  
  },


  onPullDownRefresh: function () {
    var that = this
    wx.request({
      url: 'http://zwx.wikibady.com/getorders',
      data: {
        userid: app.data.userid
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        var sub = 0
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].order.setstate == 0)
            sub = sub + 1
        }
        console.log(sub)
        that.setData({
          myorders: res.data.reverse(),
          num: sub
        })
      }
    })
  },


  onReachBottom: function () {
  
  },


  onShareAppMessage: function () {
  
  }
})
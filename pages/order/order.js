// pages/order/order.js
var app=getApp()
Page({

  data: {
    myorders: [],
    select:-1,
    num:-1,
    page: 0, /*0:全部,1:待消费,2:已完成,3:已取消*/
    loading:true 
  },
  changepage:function(e){
    var that = this
    that.setData({
      page: e.currentTarget.dataset.index,
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
      imgRoute: app.data.imgRoute,
      page: options.page
    })
  },

  onReady: function () {
  
  },


  onShow: function () {
    var that =this
    console.log('订单请求')
    that.setData({
      loading: true 
    })
    wx.request({
    url: app.data.imgRoute+'/shop/search_order_info',
      data: {
        user_id:app.data.userid,
        state:0
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
          num: sub,
          loading: false 
        })
      },
      fail: function (res) {
        wx.hideLoading()
        console.log('失败', res)
      },
      complete: function (res) {
        wx.hideLoading()
        console.log('完成', res)
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
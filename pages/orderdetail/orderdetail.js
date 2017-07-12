// pages/orderdetail/orderdetail.js
var app = getApp()
Page({

  data: {
    order: {},
    address: {},
    goods: []
  },
  onLoad: function () {
    var that = this
    that.setData({
      imgRoute: app.data.imgRoute
    })
    wx.getStorage({
      key: 'selectedorder',
      success: function(res) {
        that.setData({
          address:res.data.addr,
          order: res.data,
        })
        wx.request({
          url: app.data.imgRoute+'/shop/show_order_goods_info/',
        data: {
          order_id: res.data.order_id
        },
        method: 'GET',
        success: function (res) {
          console.log('订单详情',res)
          that.setData({
            goods: res.data.infos
          })
        }
      })
      },
    })
    
  },
  onReady: function () {
  
  },


  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
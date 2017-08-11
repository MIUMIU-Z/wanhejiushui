// pages/orderdetail/orderdetail.js
var app = getApp()
Page({

  data: {
    order: {},
    address: {},
    goods: [],
    thestate: ['', '待发货', '待收货', '已收货', '已完成', '已取消'],
    opinion: ['', '已评价', '未评完', '评价'],
    popup:false

  },
  orderconfirm:function(){
    this.setData({
      popup: true
    })
  },
  confirmdel:function(){
    this.setData({
      popup: false
    })
  },
  makecall:function(){
    wx.makePhoneCall({
      phoneNumber: app.data.phoneNumber,
      fail:function(){
        console.log('拨打电话失败')
      }
    })
  },
  confirmCommit(){
    var that = this
    wx.request({
      url: app.data.imgRoute + '/shop/confirm_gotgoods/',
      data: {
        order_id: that.data.order.order_id
      },
      method: 'GET',
      success: function (res) {
        console.log('确认收货', res)
        that.data.order.state = 3
        wx.showToast({
          title: '确认收货成功',
        })
        that.setData({
          popup: false,
          order: that.data.order
        })
      },
      fail:function(){
        wx.showToast({
          title: '确认收货失败',
          image:'../../images/sad.png'
        })
        that.setData({
          popup: false
        })
      }
    })
  },
  gotoevaluate: function (e) {
    wx.navigateTo({
      url: '../evaluate/evaluate?id=' + e.currentTarget.dataset.index,
    })
  },
  onLoad: function () {
    var that = this
    that.setData({
      imgRoute: app.data.imgRoute
    })
    wx.getStorage({
      key: 'selectedorder',
      success: function(res) {
        console.log(res)
        that.setData({
          address:res.data.addr,
          order: res.data,
          goods: res.data.goods
        })
        wx.request({
          url: app.data.imgRoute +'/shop/show_order_goods_info/',
        data: {
          order_id: res.data.order_id
        },
        method: 'GET',
        success: function (res) {
          console.log('订单详情',res)
          
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
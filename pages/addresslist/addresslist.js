// pages/addresslist/addresslist.js
var app = getApp()
Page({

  data: {
    addresslist: [],
    num:-1
  },

  add:function(){
    wx.navigateTo({
      url: '../address/address',
    })
  },
  onLoad: function (options) {
  
  },


  onReady: function () {
  
  },

  onShow: function () {
    var that =this
    wx.request({
      url: app.data.imgRoute + '/shop/user_addrs/',
      data: {
        user_id: app.data.userid
      },
      method: 'GET',
      success: function (resu) {
        console.log('地址列表', resu)
        that.setData({
          addresslist:resu.data.infos,
          num: resu.data.infos.length
        })
      }
    })
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
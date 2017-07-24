// pages/settlement_addr/settlement_addr.js
var app = getApp() 
Page({

  data: {
    addrid:-1,
    addresslist:[]
  },
  gotoaddress:function(){
    wx.navigateTo({
      url: '../addresslist/addresslist',
    })
  },
  selectaddr:function(e){
    this.setData({
      addrid: e.currentTarget.dataset.index
    })
    wx.setStorage({
      key: 'selectedaddr',
      data: e.currentTarget.dataset.index,
      success: function(res) {
        wx.navigateBack({
          delta:1
        })
      },
      fail: function(res) {
        wx.showToast({
          title: '选择失败',
        })
      },
    })
  },
  onLoad: function (options) {
  },

  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that =this
        wx.request({
          url: app.data.imgRoute + '/shop/user_addrs/',
          data: {
            user_id: app.data.userid
          },
          method: 'GET',
          success: function (resu) {
            console.log('结算页面地址列表', resu)
            for (var i = 0; i < resu.data.infos.length; i++) {
              if (resu.data.infos[i].remark == 1)
                break
            }
            that.setData({
              addresslist: resu.data.infos,
            })
            var theaddrid = i
            wx.getStorage({
              key: 'addresslist',
              success: function (res) {
                that.setData({
                  addrid: res.data.addrid
                })
              },
              fail:function(){
                that.setData({
                  addrid: theaddrid
                })
              }
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
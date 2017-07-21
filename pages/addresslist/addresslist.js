// pages/addresslist/addresslist.js
var app = getApp()
Page({

  data: {
    addresslist: [],
    num:-1
  },

  add:function(){
    wx.navigateTo({
      url: '../address/address?style=0',
    })
  },
  setdefault: function (e) {
    var that = this
    console.log(e.currentTarget.dataset.index)
    wx.request({
      url: app.data.imgRoute + '/shop/change_default_addr/',
      data: {
        addr_id: e.currentTarget.dataset.index
      },
      method: 'GET',
      success: function (resu) {
        console.log('设置默认地址', resu)
        if (resu.data == 1) {
          wx.request({
            url: app.data.imgRoute + '/shop/user_addrs/',
            data: {
              user_id: app.data.userid
            },
            method: 'GET',
            success: function (resu) {
              console.log('地址列表', resu)
              wx.hideLoading()
              that.setData({
                addresslist: resu.data.infos,
                num: resu.data.infos.length
              })
            }
          })
        }
        else {
          wx.hideLoading()
          wx.showToast({
            title: '设置失败',
            image: '../../images/tip.png'
          })
        }
      },
      fail:function(){
        wx.hideLoading()
        wx.showToast({
          title: '网络错误',
          image: '../../images/tip.png'
        })
      },
      complete:function(){
        wx.showLoading({
          title: '正在修改默认地址',
        })
      }
    })
  },
  onLoad: function (options) {
  
  },
  addrmodify:function(e){
    var that =this
    wx.setStorage({
      key: 'addr',
      data: that.data.addresslist[e.target.dataset.index],
    })
    wx.navigateTo({
      url: '../address/address?style=1',
    })
    
  },
  addrdelete:function(e){
    var that = this
    wx.request({
      url: app.data.imgRoute + '/shop/delete_user_addr',
      data: {
        addr_id: that.data.addresslist[e.target.dataset.index].addr_id
      },
      method: 'GET',
      success: function (resu) {
        console.log('删除地址', resu)
        if (resu.data==1)
        {
          wx.request({
            url: app.data.imgRoute + '/shop/user_addrs/',
            data: {
              user_id: app.data.userid
            },
            method: 'GET',
            success: function (resu) {
              console.log('地址列表', resu)
              that.setData({
                addresslist: resu.data.infos,
                num: resu.data.infos.length
              })
            }
          })
        }
        else{
          wx.showToast({
            title: '删除失败',
            image:'../../images/tip.png'
          })
        }
      }
    })
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
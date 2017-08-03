// pages/addresslist/addresslist.js
var app = getApp()
Page({

  data: {
    addresslist: [],
    num:-1,
    popup:false,
    deladdr_id:-1
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
            setTimeout(function(){
              wx.hideLoading()
            },300)
              that.setData({
                addresslist: resu.data.infos,
                num: resu.data.infos.length
              })
            }
          })
        }
        else {
          wx.hideLoading()
          setTimeout(function(){
            wx.showToast({
              title: '设置失败',
              image: '../../images/tip.png'
            })
          },500)
        }
      },
      fail:function(){
        wx.hideLoading()
        setTimeout(function () {
          wx.showToast({
            title: '网络错误',
            image: '../../images/tip.png'
          })
        }, 500)
      },
      complete:function(){
        wx.showLoading({
          title: '修改默认地址中',
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
    this.setData({
      deladdr_id: this.data.addresslist[e.target.dataset.index].addr_id,
      popup: true,
    })
  },
  canceldel:function(){
    this.setData({
      popup: false
    })
  },
  deleteCommit:function(){
    var that = this
    wx.request({
      url: app.data.imgRoute + '/shop/delete_user_addr',
      data: {
        addr_id: that.data.deladdr_id
      },
      method: 'GET',
      success: function (resu) {
        console.log('删除地址', resu)
        that.setData({
          popup: false
        })
        if (resu.data == 1) {
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
        else {
          wx.showToast({
            title: '删除失败',
            image: '../../images/tip.png'
          })
        }
      },
      fail: function () {
        that.setData({
          popup: false
        })
        wx.showToast({
          title: '网络错误',
          image: '../../images/tip.png',
          duration: 1000
        })
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
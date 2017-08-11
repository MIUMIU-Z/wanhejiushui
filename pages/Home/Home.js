var app = getApp()
Page({
  data:{
    imgUrls: [],
    recommend:[],
    imgRoute: ''
  },
  read:function(){
    this.setData({
      disclaimer: false
    })
  },
  gotosearch:function(){
    wx.navigateTo({
      url: '../goodslist/goodslist?id='+-1,
    })
  },
  gotocoupon:function(){
    console.log('转发')

  },
  gotocomcard: function () {
    wx.switchTab({
      url: '../comcard/comcard',
    })
  },
  gotocommodity:function(){
    wx.switchTab({
      url: '../commodity/commodity',
    })
  },
  gotodetail: function (e) {
    console.log(e.currentTarget.dataset.index)
    wx.setStorage({
      key: 'selectedgoods',
      data: this.data.recommend[e.currentTarget.dataset.index],
    })
    wx.navigateTo({
      url: '../detail/detail',
    })
  },
  onLoad:function(options){
    var that = this
    that.setData({
      imgRoute: app.data.imgRoute,
    })
    wx.request({
      url: that.data.imgRoute + '/shop/is_ceshi/',
      success: function (res) {
        console.log('测试请求', res)
        if (res.data == 1) {
          app.data.disclaimer = true
        }
        else {
          app.data.disclaimer = false
        }
        that.setData({
          disclaimer: app.data.disclaimer
        })
      },
      fail: function () {
        console.log('1.5秒后重新请求',res)
        setTimeout(function(){
          wx.request({
            url: that.data.imgRoute + '/shop/is_ceshi/',
            success: function (res) {
              console.log('测试请求', res)
              if (res.data == 1) {
                app.data.disclaimer = true
              }
              else {
                app.data.disclaimer = false
              }
              that.setData({
                disclaimer: app.data.disclaimer
              })
            },
            fail: function () {
              console.log('两次请求失败，版本未知')
              /*wx.showToast({
                title: '两次请求版本未知，请重启或确保小程序处于非测试状态',
                image: '../../images/tip.png',
                duration: 3000
              })*/
            }
          })
        },1500)
      }
    })
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow:function(){
    var that=this;
    wx.request({
      url: app.data.imgRoute +'/shop/hot_goodsimg/',
          data: {},
          method: 'GET',
          success: function(resu) {
            console.log('轮播图',resu)
            that.setData({
                imgUrls: resu.data.infos,
            })
          }
    })
    wx.request({
      url: app.data.imgRoute +'/shop/hot_goods/',
      data: {},
      method: 'GET',
      success: function (resu) {
        console.log('推荐商品',resu)
        that.setData({
          recommend: resu.data.infos
        })
      }
    })

  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
  },

  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: '万和酒水小程序商城',
      path: '/pages/Home/Home',
      success: function (res) {
        wx.showToast({
          title: '转发成功',
          duration: 500
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '转发失败',
          image:'../../images/sad.png',
          duration:500
        })
      }
    }
  }
})
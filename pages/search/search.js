// pages/search/search.js
var app = getApp()
Page({
  data:{
    search:"",
    recommend_list:["葡萄酒","玉泉","北大仓","五粮液","酒鬼"],
    goods: [],
    imgRoute:'',
    num:-1
  },
  getsearch: function (e) {
    var that = this
      that.setData({
        search: e.detail.value
      })     

  },
  reset:function(e){
    this.setData({
      search:""
    })
  },
  clicksearch:function(e){
    var that =this
    var index = e.currentTarget.dataset.index
    wx.request({
      url: that.data.imgRoute + '/shop/goods_search/',
      data: {
        keyword: that.data.recommend_list[index]
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        that.setData({
          goods: res.data.infos,
          num: res.data.infos.length
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 500)
      },
      complete: function () {
        wx.showLoading({
          title: '查询中',
          mask: true
        })
      }
    })
  },
  search:function(e){
    var that =this
    if (that.data.search!="")
    {
      wx.request({
        url: that.data.imgRoute+'/shop/goods_search/',
        data: {
          keyword: that.data.search
        },
        method: 'GET',
        success: function (res) {
          console.log(res)
          that.setData({
            goods: res.data.infos,
            num: res.data.infos.length
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 500)
        },
        complete: function(){
          wx.showLoading({
            title: '查询中',
            mask: true
          })
        }
      })
    }
    else
    {
      wx.showToast({
        title: '请填写搜索内容',
        image:'../../images/tip.png',
        mask: true,
        duration:1200
      })
    }
  },
  gotodetail: function (e) {
    var that =this
    console.log(e.currentTarget.dataset.index)
    wx.setStorage({
      key: 'selectedgoods',
      data: that.data.goods[e.currentTarget.dataset.index],
    })
    wx.navigateTo({
      url: '../detail/detail',
    })
  },
  onLoad:function(options){
    var that =this
    that.setData({
      imgRoute: app.data.imgRoute
    })
  },
  onReady:function(){
  },
  onShow:function(){
    this.setData({
      node:0
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
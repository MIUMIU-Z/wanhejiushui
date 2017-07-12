// pages/search/search.js
var app = getApp()
Page({
  data:{
    search:"",
    recommend_list:["生活家电","热水器","冰箱","彩电","洗衣机","空调","加湿器"],
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
  search:function(e){
    var that =this
    if (that.data.search!="")
    {
      wx.request({
        url: 'http://192.168.255.26:8000/shop/goods_search/',
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
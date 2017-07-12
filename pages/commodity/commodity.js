// pages/commodity/commodity.js
var app = getApp()
Page({
  data:{
    types:{},
    goods:{},
    selectLeftid: 0,
  },
  switchRightTab: function(e) {
    var that =this
    console.log(e)
    this.setData({
        selectLeftid: e.target.dataset.index, 
    })
    wx.request({
      url: app.data.imgRoute + '/shop/goods_class/',
      data: {
        goods_class: that.data.selectLeftid + 1
      },
      method: 'GET',
      success: function (res) {
        console.log('商品列表', res)
        that.setData({
          goods: res.data.infos,
        })
      }
    })
  },
  gotodetail:function(e){
    console.log(e.currentTarget.dataset.index)
    wx.setStorage({
      key: 'selectedgoods',
      data: this.data.goods[e.currentTarget.dataset.index],
    })
    wx.navigateTo({
      url: '../detail/detail',
    })
  },
  onLoad:function(){
    var that = this
    that.setData({
      imgRoute: app.data.imgRoute
    })
     wx.request({
       url: app.data.imgRoute+'/shop/get_class/',
       success: function(res) {
          console.log('商品类别',res)
          res.data.class_list.splice(0,1)
          that.setData({
            types: res.data.class_list,
          })
          wx.request({
            url: app.data.imgRoute +'/shop/goods_class/',
            data:{
              goods_class: that.data.selectLeftid+1
            },
            method: 'GET',
            success: function (res) {
              console.log('商品列表',res)
              that.setData({
                goods: res.data.infos,
              })
            }
          })
       }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
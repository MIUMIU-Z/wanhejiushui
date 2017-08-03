// pages/commodity/commodity.js
var app = getApp()
Page({
  data:{
    types:[],
    goods:{},
    selectLeftid: 0,
  },
  gotosearch:function(){
    wx.navigateTo({
      url: '../goodslist/goodslist?id='+-1,
    })
  },
  gotogoodslist:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../goodslist/goodslist?id=1',
    })
  },
  switchRightTab: function(e) {
    var that =this
    this.setData({
      selectLeftid: e.currentTarget.dataset.index, 
    })
    that.setData({
      goods: that.data.types[e.currentTarget.dataset.index].data
    })
  },
  gotogoodslist:function(e){

    wx.navigateTo({
      url: '../goodslist/goodslist?id='+e.currentTarget.dataset.id,
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
      imgRoute: app.data.imgRoute,
      /*types: [{ class_name: '白酒' }, { class_name: '啤酒' }, { class_name: '红酒' }, { class_name: '饮料' }],
      goods: [{ name: '玉泉方瓶', img: '../../images/nullimg.png', id: 0 }, { name: '玉泉方瓶', img: '../../images/nullimg.png', id: 0 }, { name: '玉泉方瓶', img: '../../images/nullimg.png', id: 0 }, { name: '玉泉方瓶', img: '../../images/nullimg.png', id: 0 }, { name: '玉泉方瓶', img: '../../images/nullimg.png', id: 0 }, { name: '玉泉方瓶', img: '../../images/nullimg.png', id: 0 }, { name: '玉泉方瓶', img: '../../images/nullimg.png', id: 0 }],*/
    })
     wx.request({
       url: app.data.imgRoute+'/shop/get_class/',
       success: function(res) {
          console.log('商品类别',res)
          that.setData({
            types: res.data.infos,
            goods: res.data.infos[0].data
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
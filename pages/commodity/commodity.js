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
      url: '../search/search',
    })
  },
  gotogoodslist:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../goodslist/goodslist',
    })
  },
  switchRightTab: function(e) {
    var that =this
    console.log(e)
    this.setData({
      selectLeftid: e.currentTarget.dataset.index == that.data.selectLeftid ? -1 : e.currentTarget.dataset.index, 
      selectLeftsubid: 0
    })
    if (that.data.selectLeftid!=-1)
    {
      that.setData({
        goods: [{ name: '玉泉方瓶', img: '../../images/tip.png', id: 0 }, { name: '玉泉方瓶', img: '../../images/more.png', id: 0 }, { name: '玉泉方瓶', img: '../../images/order.png', id: 0 }, { name: '玉泉方瓶', img: '../../images/order.png', id: 0 }, { name: '玉泉方瓶', img: '../../images/order.png', id: 0 }, { name: '玉泉方瓶', img: '../../images/order.png', id: 0 }, { name: '玉泉方瓶', img: '../../images/order.png', id: 0 }],
      })
    /*wx.request({
      url: app.data.imgRoute + '/shop/goods_class/',
      data: {
        goods_class: that.data.types[this.data.selectLeftid].data[0].brand_id
      },
      method: 'GET',
      success: function (res) {
        console.log('商品列表', res)
        that.setData({
          goods: res.data.infos,
        })
      }
    })*/

    }
  },
  gotogoodslist:function(e){
    /*var that = this
    console.log(e)
    this.setData({
      selectLeftsubid: e.target.dataset.index,
    })
    wx.request({
      url: app.data.imgRoute + '/shop/goods_class/',
      data: {
        brand_id: e.currentTarget.dataset.id
      },
      method: 'GET',
      success: function (res) {
        console.log('商品列表', res)
        that.setData({
          goods: res.data.infos,
        })
      }
    })*/
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
          that.setData({
            /*types: res.data.infos,*/
            types: [{ class_name: '白酒' }, { class_name: '啤酒' }, { class_name: '红酒' }, { class_name: '饮料' }],
            goods: [{ name: '玉泉方瓶', img: '../../images/tip.png', id: 0 }, { name: '玉泉方瓶', img: '../../images/more.png', id: 0 }, { name: '玉泉方瓶', img: '../../images/order.png', id: 0 }, { name: '玉泉方瓶', img: '../../images/order.png', id: 0 }, { name: '玉泉方瓶', img: '../../images/order.png', id: 0 }, { name: '玉泉方瓶', img: '../../images/order.png', id: 0 }, { name: '玉泉方瓶', img: '../../images/order.png', id: 0 }],
          })
          /*wx.request({
            url: app.data.imgRoute +'/shop/goods_class/',
            data:{
              goods_class: res.data.infos[0].data[0].brand_id
            },
            method: 'GET',
            success: function (res) {
              console.log('商品列表', res, res.data.infos)
              that.setData({
                goods: res.data.infos,
              })
            }
          })*/
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
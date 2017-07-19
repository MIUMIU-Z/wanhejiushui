// pages/detail/detail.js
var app = getApp()
Page({
  data:{
    orderindex:-1,
    goodsinfo:{},
    goodswiper:[],
    goodimg:[],
    num:0,
    imgRoute: ''
    },
  numreduce:function(){
    if (this.data.num>0)
        this.setData({
           num: this.data.num-1
    })
  },
  numincrease:function(){
    this.setData({
        num: this.data.num+1
    })
  },
 addtocart:function(){
    var theorder={} 
    if (this.data.orderindex < 0 && this.data.num>0)
    { 
      theorder.goods_id = this.data.goodsinfo.goods_id
      theorder.name = this.data.goodsinfo.name
      theorder.price = this.data.goodsinfo.price
      theorder.img = this.data.goodsinfo.img
      theorder.num = this.data.num
      theorder.edit = 0
      app.data.orderlist.push(theorder)
      wx.showToast({
        mask: 'True',
        title: '已添加到购物车',
        duration: 1200
      })
    }
    else if (this.data.orderindex >= 0 && this.data.num > 0)
    {
      app.data.orderlist[this.data.orderindex].num = this.data.num
      wx.showToast({
        mask: 'True',
        title: '已更新该商品数量',
        duration: 1200
      })
    }
    else
    {
      wx.showToast({
        mask:'True',
        title: '请选择商品数量',
        image:'../../images/tip.png',
        duration:1200
      })
    }
    console.log(app.data.orderlist)
 },

  onLoad:function(){
    var that=this;
    that.setData({
      imgRoute: app.data.imgRoute
    })
    wx.getStorage({
      key: 'selectedgoods',
      success: function(res) {
        that.setData({
          goodsinfo:res.data,
        })
        for (var i = 0; i < app.data.orderlist.length; i++)
        {
          if (app.data.orderlist[i].goods_id == res.data.goods_id)
          {
            that.setData({
              orderindex:i,
              num: app.data.orderlist[i].num
            })
            break
          }
        }
        console.log(that.data.goodsinfo.goods_id)
        wx.request({
          url: app.data.imgRoute+'/shop/show_goods_detail/',
          data: {
            goods_id: that.data.goodsinfo.goods_id
          },
          success: function(resu) {
            console.log(resu)
              that.setData({
                goodswiper: resu.data.infos.img_list,
                goodimg:resu.data.infos.detail_list
              })
          }
        })
      },
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
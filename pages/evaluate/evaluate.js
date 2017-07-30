// pages/evaluate/evaluate.js
var app = getApp()
Page({

  data: {
    goods: [{ picture: '/media/goodsimg/15.jpg', name: '酒鬼', anony: 0, text: '', star: 0, img: [], imgnum:0}],
    address:{},
    order:{},
    placeholder:'说说你的体验，分享给想买的他们吧！(最多230字)',
    anonytip: ['你的评论能帮助其他小伙伴呦','你写的评论会以匿名的形式展现'],
    imgRoute: 'https://vxlab.gxxnr.cn',
    speedstar:0,
    servicestar:0
  },
  selectanony:function(e){
    var index = e.currentTarget.dataset.index
    this.data.goods[index].anony = this.data.goods[index].anony==0?1:0
    this.setData({
      goods: this.data.goods
    })
  },
  changeimg:function(e){
    var that = this
    var index = e.currentTarget.dataset.index
    wx.chooseImage({
      count: 1,
      sizeType: [
        'original', 'compressed'
      ],
      sourceType: [
        'album', 'camera'
      ],
      success: function (res) {
        console.log(res.tempFilePaths)
        that.data.goods[index].img[e.currentTarget.dataset.imgid] = res.tempFilePaths[0]
        console.log(that.data.goods)
        that.setData({
          goods: that.data.goods,
        });
      },
    })
  },
  selectimg:function(e){
    var that = this
    var index = e.currentTarget.dataset.index
    wx.chooseImage({
      count: 2 - that.data.goods[index].imgnum,
      sizeType: [
        'original', 'compressed'
      ],
      sourceType: [
        'album', 'camera'
      ],
      success: function(res) {

        console.log(res.tempFilePaths)
        that.data.goods[index].img = that.data.goods[index].img.concat(res.tempFilePaths) 
        that.data.goods[index].imgnum = that.data.goods[index].img.length
        console.log(that.data.goods)
        that.setData({
           goods: that.data.goods,
         });
      },
    })
  },

  speedstar:function(e){
    if (this.data.speedstar == 1 && e.currentTarget.dataset.star == 1)
      this.data.speedstar = 0
    else
      this.data.speedstar = e.currentTarget.dataset.star
    this.setData({
      speedstar: this.data.speedstar
    })
  },
  servicestar:function(e){
    if (this.data.servicestar == 1 && e.currentTarget.dataset.star == 1)
      this.data.servicestar = 0
    else
      this.data.servicestar = e.currentTarget.dataset.star
    this.setData({
      servicestar: this.data.servicestar
    })
  },
  selectstar:function(e){
    var index = e.currentTarget.dataset.index
    if (this.data.goods[index].star == 1 && e.currentTarget.dataset.star==1)
      this.data.goods[index].star =0
    else
      this.data.goods[index].star = e.currentTarget.dataset.star
    this.setData({
      goods: this.data.goods
    })
  },

  commit:function(){
    var that =this
    console.log(that.data.speedstar)
    console.log(that.data.servicestar)
    console.log(that.data.goods)
  },

  
  onLoad: function (options) {
    var that = this
    that.setData({
      imgRoute: app.data.imgRoute
    })
    /*wx.getStorage({
      key: 'selectedorder',
      success: function (res) {
        that.setData({
          address: res.data.addr,
          order: res.data,
        })
        wx.request({
          url: app.data.imgRoute + '/shop/show_order_goods_info/',
          data: {
            order_id: res.data.order_id
          },
          method: 'GET',
          success: function (res) {
            console.log('订单详情', res)
            that.setData({
              goods: res.data.infos
            })
          }
        })
      },
    })*/
  },

  onReady: function () {
  
  },

  onShow: function () {
  
  },

  onHide: function () {
  
  },

  onUnload: function () {
  
  },

  onPullDownRefresh: function () {
  
  },

  onReachBottom: function () {
  
  },

  onShareAppMessage: function () {
  
  }
})
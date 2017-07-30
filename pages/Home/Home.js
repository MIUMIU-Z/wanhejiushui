var app = getApp()
Page({
  data:{
    imgUrls: [],
    recommend:[],
    imgRoute: ''
  },

  gotosearch:function(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  gotocard:function(){
    wx.addCard({
      cardList: [
        {
          cardId: '',
          cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}'
        }
      ],
      success: function (res) {
        console.log(res.cardList) // 卡券添加结果
      }
    })
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
      imgRoute: app.data.imgRoute
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
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})
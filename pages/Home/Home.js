var app = getApp()
Page({
  data:{
    imgUrls: [],
    recommend:[],
    imgRoute: ''
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
      url: app.data.imgRoute +'/shop/hot_goodsimg',
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
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
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
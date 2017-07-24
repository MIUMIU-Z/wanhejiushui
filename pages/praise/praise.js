// pages/praise/praise.js
var app = getApp()
Page({

  data: {
    goods_id:-1,
    praiselist: [{ name: '刘国峰', star: 4, text: '哎吆，不错哦', img: [], time: '2017-07-24 17:11' }, { name: '雷阵雨', star: 4, text: '特意用了一段时间才来评论的，酒精效果非常不错，绝对超值。送货很快，比下单还提前一天，收货第二天就接到了新品试喝预约电话。酒的纯度很高，拿出来给人一闻就醉了，闻完一圈酒桌上就我一人还坐着。还送了下酒菜，非常赞！！！', img: ['../../images/title.png', '../../images/title.png'], time: '2017-07-24 17:11' }],
    praisenum:[3,2,1,0],
    praise_degree:99,
    type:0
  },
  changetype:function(e){
    this.setData({
      type:e.currentTarget.dataset.index
    })
    wx.request({
      url: app.data.imgRoute + '',
      data: {
        goods_id: options.id,
        type: that.data.type
      },
      success: function (res) {
        console.log('评价返回', res)
      }
    })
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      imgRoute: app.data.imgRoute,
      goods_id: options.id
    })
    wx.request({
      url: app.data.imgRoute+'',
      data:{
        goods_id: options.id,
        type:0
      },
      success:function(res){
        console.log('评价返回',res)
      }
    })
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
// pages/praise/praise.js
function getpraise(that, goods_id,rank,offset){
  if (!that.data.loading) {
   that.setData({
     loading: true,
    })
    wx.request({
      url: app.data.imgRoute + '/shop/show_goods_comments/',
      data: {
        goods_id: goods_id,
        rank: rank,
        offset: offset
      },
      success: function (res) {
        console.log('获取评论返回', res)
        if (res.data.null==1)
        {
          wx.showToast({
            title: '服务器故障，请联系管理员',
            image:'../../images/tip.png',
            mask:true
          })
        }
        else{
          var subgrade = [res.data.total_num, res.data.good_num, res.data.medium_num, res.data.bad_num]
          var sublist = that.data.praiselist.concat(res.data.infos)
          setTimeout(function(){
            that.setData({
              Allow_refresh: res.data.infos.length < that.data.step?false:true,
              loading: false,
              praisenum: subgrade,
              praise_degree: res.data.good_proportion,
              praiselist: sublist
            })
          },1000)
        }

      },
      fail:function(res){
        wx.showToast({
          title: '服务器故障，请联系管理员',
          image: '../../images/tip.png',
          mask: true
        })
      }
    })
  }
  else {
    console.log('已经在刷新了')
  }
}

var app = getApp()
Page({

  data: {
    goods_id:-1,
    praiselist: [],
    praisenum:[0,0,0,0],
    praise_degree:99,
    type:0,
    step:10,
    loading:false,
    imgshow: false,
    theimg: '',
    vertical: 0,
    backtop: false,
    Allow_refresh:true,
    stepRecord:0
  },

  backtotop: function () {
    console.log('回到顶部')
    this.setData({
      vertical: 0,
      backtop: false
    })
  },
  scroll: function (e) {
    if (e.detail.scrollTop > 120) {
      this.setData({
        backtop: true
      });
    } else {
      this.setData({
        backtop: false
      });
    }
  },
  reachbottom: function () {
    var that = this
    if (that.data.Allow_refresh)
    {
      that.data.stepRecord = that.data.stepRecord + that.data.step
      getpraise(that, that.data.goods_id, that.data.type, that.data.stepRecord)
    }
    else{
      wx.showToast({
        title: '没有更多评论了',
        image:'../../images/null.png',
        mask:true
      })
    }

  },
  showimg: function (e) {
    console.log(e)
    this.setData({
      theimg: e.currentTarget.dataset.img,
      imgshow: true,
    })
  },
  backtopage: function () {
    this.setData({
      theimg: '',
      imgshow: false,
    })
  },
  changetype:function(e){
    var that =this
    this.setData({
      type:e.currentTarget.dataset.index,
      praiselist: [],
      stepRecord: 0,
      Allow_refresh: true
    })
    getpraise(that, that.data.goods_id, that.data.type, 0)
  },
  onLoad: function (options) {
    console.log(options.id)
    var that = this
    that.setData({
      imgRoute: app.data.imgRoute,
      praiselist: [],
      stepRecord:0,
      Allow_refresh: true
    })
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })  
    that.setData({
      goods_id: options.id
    })
    getpraise(that, options.id, 0, 0)
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

  onShareAppMessage: function () {
  
  }
})
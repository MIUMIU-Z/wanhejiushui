// pages/order/order.js
function reqorder(that, user_id, state, offset,style){
  if (!that.data.loading) 
  {
    that.setData({
      loading: true,
      Allow_refresh: true,
    })
    console.log('请求内容:', 'user_id', user_id, 'state', state,'offset',offset)
    wx.request({
      url: that.data.imgRoute + '/shop/search_order_info/',
      data: {
        user_id: user_id,
        state: state,
        offset:offset
      },
      method: 'GET',
      success: function (res) {
        console.log('订单列表', res)
        if (res.data.null == 1) {
          wx.showToast({
            title: '数据错误，请联系管理员',
            image: '../../images/tip.png',
            mask: true
          })
          that.setData({
            loading: false
          })
        }
        else {
          var sublist = that.data.myorders.concat(res.data.infos)
          if (style==1)
          {
            setTimeout(function () {
              that.setData({
                Allow_refresh: res.data.infos.length < that.data.step ? false : true,
                myorders: sublist,
                ordernum: sublist.length,
                loading: false
              })
            }, 1000)
          }
          else{
            that.setData({
              Allow_refresh: res.data.infos.length < that.data.step ? false : true,
              myorders: sublist,
              ordernum: sublist.length,
              loading: false
            })
          }
        }
      },
      fail: function (res) {
        console.log('失败', res)
        wx.showToast({
          title: '服务器故障，请联系管理员',
          image: '../../images/tip.png',
          mask: true
        })
        that.setData({
          loading: false
        })
      },
      complete: function (res) {

      }
    })
  }
  else{
    console.log('已经在刷新了')
  }
}


var app=getApp()
Page({
  data: {
    myorders: [],
    goods:[],
    select:-1,
    ordernum:-1,
    thestate: ['','待发货','待收货','已收货','已完成','已取消'],
    opinion:['','已评价','未评完','评价'],
    page: 1, /*0:全部,1:待发货,2:待收货,3:待评价*/
    loading:false,
    step:5,     //每次请求的步长
    vertical:0,
    backtop:false,
    Allow_refresh: true,
    stepRecord: 0
  },
  backtotop:function(){
    console.log('回到顶部')
    this.setData({
      vertical: 0,
      backtop: false
    })
  },
  scroll:function(e){
    if (e.detail.scrollTop > 150) {
      this.setData({
        backtop: true
      });
    } else {
      this.setData({
        backtop: false
      });
    }
  },
  changepage:function(e){
    var that = this
    that.setData({
      page: e.currentTarget.dataset.index,
      myorders: [],
      ordernum: -1,
      stepRecord: 0
    })
    reqorder(that, app.data.userid, e.currentTarget.dataset.index,0,0)
  },
  popdel:function(e){

  },

  gotoevaluate:function(e){
    wx.navigateTo({
      url: '../evaluate/evaluate?id='+e.currentTarget.dataset.index,
    })
  },
  gotoorderdetail:function(e){
    wx.setStorage({
      key: 'selectedorder',
      data: this.data.myorders[e.currentTarget.dataset.index],
    })
    wx.navigateTo({
      url: '../orderdetail/orderdetail',
    })
  },
  reachbottom:function(){
    var that = this
    if (that.data.Allow_refresh) {
      if (!that.data.loading)
      {
        that.data.stepRecord = that.data.stepRecord + that.data.step
      }
      reqorder(that, app.data.userid, that.data.page, that.data.stepRecord, 1)
    }
    else {
      wx.showToast({
        title: '没有更多订单了',
        image: '../../images/null.png',
        duration:500
      })
    }

  },


  onLoad: function (options) {
    var that = this
    that.setData({
      imgRoute: app.data.imgRoute,
      page: options.page
    })
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })  

  },

  onReady: function () {
  
  },


  onShow: function () {
    var that =this
    that.setData({
      imgRoute: app.data.imgRoute,
      myorders: [],
      ordernum: -1
    })
    reqorder(that, app.data.userid,that.data.page,0,0)
  },


  onHide: function () {
  
  },


  onUnload: function () {
  
  },


  onPullDownRefresh: function () {
    var that = this

  },

/*
  onReachBottom: function () {
    var that = this
    if (!that.data.loading) {
      that.setData({
        loading: true
      })
      setTimeout(function () {
        console.log('刷新成功')
        that.data.myorders = that.data.myorders.concat(that.data.myorders)
        that.setData({
          myorders: that.data.myorders,
          loading: false
        })
      }, 2000)
    }
    else {
      console.log('已经在刷新了')
    }
  },
*/

  onShareAppMessage: function () {
  
  }
})
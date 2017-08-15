//app.js
function getuserid(that, res, code)
{
  wx.request({
    url: that.data.imgRoute + '/shop/add_user/',
    data: {
      code: code,
      info: res.userInfo
    },
    method: 'POST',
    success: function (res) {
      console.log('登陆', res)
      setTimeout(function () {
        wx.hideLoading()
      }, 500)
      if (res.data.state <= 0) {
        setTimeout(function () {
          wx.showLoading({
            title: '数据错误,请联系管理人员',
            mask: true,
            image: '../../images/tip.png'
          })
        }, 500)
      }
      else{
        that.data.userid = res.data.state
      }

    },
    fail: function () {

      setTimeout(function () {
        wx.showLoading({
          title: '正在重新认证',
          mask: true,
          image: '../../images/tip.png'
        })
      }, 500)
      setTimeout(function(){
        getuserid(that, res, code)
      },3000)
    },
    complete: function () {

    }
  })
}


App({
  data:{
    //imgRoute: 'http://192.168.1.5:8000',
    //imgRoute: 'http://192.168.255.26:8000',
    imgRoute: 'https://vxlab.gxxnr.cn',
    //imgRoute: 'http://47.94.109.22:8000',
    //imgRoute: 'http://192.168.199.151:8000',
    //imgRoute: 'http://192.168.255.27:8000',
    //imgRoute: 'http://192.168.255.28:8000',
    orderlist:[],
    userid:-1,
    phoneNumber:'13159878356',
    disclaimer:false
  },
  onLaunch: function () {
    wx.showLoading({
      title: '正在初始化',
      mask: true
    })
    var that = this
    /*this.data.userid = 2
    setTimeout(function () {
      wx.hideLoading()
    }, 500)*/
    wx.login({
      success: function (res){
        var code = res.code
        wx.getUserInfo({
          success: function (res){
            console.log('code',code)
            getuserid(that, res,code)
          },
          fail: function (res) {
            console.log('获取信息失败', res)
            wx.showLoading({
              title: '微信凭证失效，请在微信中重启小程序',
              image: '../../images/sad.png'
            })
          }
        })
      },
      fail:function(res){
        console.log('微信认证失败',res)
        wx.showLoading({
          title: '微信认证失效，请在微信中重启小程序',
          image:'../../images/tip.png'
        })
      }
    })
  },

  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }})}
  },
  globalData:{
    userInfo:null
  }
})
//app.js
App({
  data:{
    //imgRoute: 'http://192.168.1.5:8000',
    //imgRoute: 'http://192.168.255.26:8000',
    //imgRoute: 'https://vxlab.gxxnr.cn',
    //imgRoute: 'http://47.94.109.22:8000',
    //imgRoute: 'http://192.168.199.151:8000',
    //imgRoute: 'http://192.168.255.27:8000',
    imgRoute: 'http://192.168.255.28:8000',
    orderlist:[],
    userid:-1
  },
  onLaunch: function () {
    var that = this
    wx.login({
      success: function (res){
        var code = res.code
        wx.getUserInfo({
          success: function (res){
            console.log(code)
            console.log(res.userInfo)
            wx.showLoading({
              title: '正在初始化',
              mask: true
            })
            wx.request({
              url: that.data.imgRoute +'/shop/add_user/',
              data: {
                code: code,
                info: res.userInfo
              },
              method: 'POST',
              success: function (res) {
                console.log('登陆',res)
                setTimeout(function(){
                  wx.hideLoading()
                },500)
                if (res.data.state<=0)
                {
                  setTimeout(function () {
                    wx.showToast({
                      title: '数据错误,请重新启动',
                      mask:true,
                      image:'../../images/tip.png'
                    })
                  }, 1000)
                }
                that.data.userid = res.data.state
              },
              fail:function(){
                setTimeout(function () {
                  wx.hideLoading()
                }, 500)
                setTimeout(function () {
                  wx.showToast({
                    title: '服务器故障,请联系管理人员',
                    mask: true,
                    image: '../../images/tip.png'
                  })
                }, 1000)
              },
              complete: function () {

              }
            })
          }
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
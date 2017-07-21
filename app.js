//app.js
App({
  data:{
    //imgRoute: 'http://192.168.255.26:8000',
    imgRoute: 'https://vxlab.gxxnr.cn',
    //imgRoute: 'http://47.94.109.22:8000',
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
            wx.request({
              url: that.data.imgRoute +'/shop/add_user/',
              data: {
                code: code,
                info: res.userInfo
              },
              method: 'POST',
              success: function (res) {
                console.log('登陆',res)
                that.data.userid = res.data.state
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
// pages/address/address.js
var app = getApp()
Page({
  data:{
    address:{}
  },
  onLoad:function(options){
    var that = this
    that.setData({
      imgRoute: app.data.imgRoute
    })

  },
  addresssubmit:function(e){
    var sub = e.detail.value
    sub.userid = app.data.userid
    if (sub.contact != '' && sub.phone != '' && sub.province != '' && sub.city != '' && sub.county != '' && sub.address != '')
    {
      console.log('address',sub)
      wx.request({
        url: app.data.imgRoute+'/shop/add_useraddr/',
          data: {
            address:sub,
          },
          method: 'POST',
          success: function (res) {
            console.log('地址',res)
            if (res.data.state==1)
            {
                setTimeout(function () {
                  wx.hideLoading(),
                    wx.showToast({
                      title: '增添成功',
                      mask: true
                    })
                }, 500)
            }
            else if (res.data.state == 0)
            {
              setTimeout(function () {
                wx.hideLoading(),
                  wx.showToast({
                    title: '增添失败',
                    mask: true
                  })
              }, 500)            
            }
          },
          complete: function (res) {
            console.log(res)
            wx.showLoading({
              title: '提交中',
              mask: true
            })
          }
        })
    }
    else
    {
      wx.showToast({
        image: '../../images/tip.png',
        mask: true,
        duration: 1200,
        title: '请填写完整信息'
      })
    }
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    /*var that =this
    wx.request({
      url: 'http://zwx.wikibady.com/getaddress',
      data: {
        userid: app.data.userid
      },
      success: function (res) {
        console.log(res)
        if (res.data.note==1)
        {
          that.setData({
            address: res.data.data
          })
        }
      }
    })*/
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
// pages/address/address.js
var app = getApp()
Page({
  data:{
    address:{},
    style:0,
    defaultaddr:true
  },
  onLoad:function(options){
    var that = this
    that.setData({
      style:options.style
    })
    if (options.style==1)
    {
      wx.getStorage({
        key: 'addr',
        success: function (res) {
          that.setData({
            address: res.data,
            defaultaddr: res.data.remark==0?false:true
          })
        },
      })
    }

    that.setData({
      imgRoute: app.data.imgRoute
    })

  },
  agreedefault:function(){
    this.setData({
      defaultaddr: this.data.defaultaddr ? false:true
    })
  },

  addresssubmit:function(e){
      var that = this
      var sub = e.detail.value
      sub.userid = app.data.userid
      sub.remark = this.data.defaultaddr?1:0
      if (sub.contact != '' && sub.phone != '' && sub.province != '' && sub.city != '' && sub.county != '' && sub.address != '') {
        console.log('address', sub)
        wx.request({
          url: app.data.imgRoute + (that.data.style == 0 ? '/shop/add_useraddr/' : '/shop/change_user_addr/'),
          data: {
            address: sub,
            addr_id: that.data.style == 0 ? -1 :that.data.address.addr_id
          },
          method: 'POST',
          success: function (res) {
            console.log('地址', res)
            if (res.data == 1) {
              setTimeout(function () {
                wx.hideLoading(),
                  wx.showToast({
                  title: that.data.style == 0 ? '增添成功' :'修改成功',
                    mask: true
                  })
              }, 500)
              wx.navigateBack({
                delta: 1
              })
            }
            else if (res.data == 0) {
              setTimeout(function () {
                wx.hideLoading(),
                  wx.showToast({
                  title: that.data.style == 0 ? '增添失败' : '修改失败',
                    mask: true
                  })
              }, 500)
            }
          },
          complete: function (res) {
            wx.showLoading({
              title: '提交中',
              mask: true
            })
          }
        })
      }
      else {
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

  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
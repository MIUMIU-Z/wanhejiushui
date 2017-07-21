// pages/address/address.js
var app = getApp()
Page({
  data:{
    address:{},
    style:0,
    defaultaddr:true,
    region:[],
    region_got:false,
    province_got:false,
    city_got: false,
    county_got: false
  },
  onLoad:function(options){
    var that = this
    that.setData({
      style:options.style
    })
    if (options.style == 1) {
      wx.getStorage({
        key: 'addr',
        success: function (res) {
          var sub = []
          sub[0] = res.data.province
          sub[1] = res.data.city
          sub[2] = res.data.county
          that.setData({
            address: res.data,
            defaultaddr: res.data.remark == 0 ? false : true,
            region:sub,
            province_got: true,
            city_got: true,
            county_got: true,
            region_got:true
          })
        },
      })
    }
    else
    {
      that.setData({
        region: ['请选择所在省/直辖市', '请选择所在市','请选择所在县/区'],
        province_got: false,
        city_got: false,
        county_got: false,
        region_got:false
      })
    }

    that.setData({
      imgRoute: app.data.imgRoute
    })
  },
  pickertap:function(){
    console.log('tap')
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
      sub.province = that.data.region[0]
      sub.city = that.data.region[1]
      sub.county = that.data.region[2]
      sub.remark = this.data.defaultaddr?1:0
      console.log('地址表单',sub)
      if (sub.contact != '' && sub.phone != '' && that.data.region_got==true && sub.address != '') {
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
  selectRegion:function(e){
    var that =this
    console.log(e)
    that.setData({
      region:e.detail.value,
      province_got:true,
      city_got: true,
      county_got: true,
      region_got: true
    })
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
// pages/address/address.js
var app = getApp()
Page({
  data:{
    address:{},
    style:0,
    defaultaddr:true,
    theProvinceList: [],
    provinceList:[],
    province:'',
    provinceid:0,
    theCityList:[],
    cityList:[],
    city: '',
    cityid:0,
    citypanel:false,
    theCountyList: [],
    countyList:[],
    county:'',
    countyid:0,
    countypanel:false,
    addrpanel:false
  },
  onLoad:function(options){
    var that = this
    that.setData({
      style:options.style
    })
    wx.request({
      url: app.data.imgRoute + '/shop/get_region/',
      data: {
        region_id: 1
      },
      method: 'GET',
      success: function (res) {
        console.log('省', res)
        for (var i = 0; i < res.data.infos.length; i++) {
          that.data.provinceList.push(res.data.infos[i].region_name)
        }
        that.setData({
          theProvinceList: res.data.infos,
          provinceList: that.data.provinceList,
          citypanel: false,
          countypanel: false,
          addrpanel: false
        })
        if (options.style == 1) {
          wx.getStorage({
            key: 'addr',
            success: function (res) {
              that.setData({
                address: res.data,
                defaultaddr: res.data.remark == 0 ? false : true,
                countypanel: true,
                addrpanel: true,
                citypanel: true,
                province: res.data.province,
                city: res.data.city,
                county: res.data.county
              })
            },
          })
        }
      }
    })

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
      sub.remark = this.data.defaultaddr?1:0
      console.log('地址表单',sub)
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
  selectProvince:function(e){
    var that =this
    that.data.cityList = []
    this.setData({
      province: that.data.theProvinceList[e.detail.value].region_name,
      provinceid: e.detail.value
    })
    wx.request({
      url: app.data.imgRoute + '/shop/get_region/',
      data: {
        region_id: that.data.theProvinceList[e.detail.value].region_id
      },
      method: 'GET',
      success: function (res) {
        console.log('市', res)
        for (var i = 0; i < res.data.infos.length; i++) {
          that.data.cityList.push(res.data.infos[i].region_name)
        }
        that.setData({
          theCityList: res.data.infos,
          cityList: that.data.cityList,
          citypanel:true,
          countypanel: false,
          addrpanel: false,
          city: '',
          county:''
        })
      }
    })
  },
  selectCity: function (e) {
    var that = this
    that.data.countyList = []
    this.setData({
      city: that.data.theCityList[e.detail.value].region_name,
      cityid: e.detail.value
    })
    wx.request({
      url: app.data.imgRoute + '/shop/get_region/',
      data: {
        region_id: that.data.theCityList[e.detail.value].region_id
      },
      method: 'GET',
      success: function (res) {
        console.log('县', res)
        for (var i = 0; i < res.data.infos.length; i++) {
          that.data.countyList.push(res.data.infos[i].region_name)
        }
        that.setData({
          theCountyList: res.data.infos,
          countyList: that.data.countyList,
          countypanel:true,
          county: '',
          addrpanel: false
        })
      }
    })
    
  },
  selectCounty: function (e) {
    var that = this
    var sub = this.data.address
   
    this.setData({
      county: that.data.theCountyList[e.detail.value].region_name,
      countyid:e.detail.value,
      addrpanel: true,
      
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
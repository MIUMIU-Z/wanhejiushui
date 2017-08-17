// pages/receipt/receipt.js
var app = getApp()
Page({

  data: {
    bill_content:'明细',
    bill_top:'',
    is_paper:0,
    is_people:1,
    need_bill:0,
    /*contentlist: ['明细'],*/
    selectid:0,
    contenttip:'温馨提示：建议发票内容选择明细，以保证您可以享受厂商提供的售后服务',
    identify_num:'',
    bill_top:'',
    typetip:'使用同一种普通增值税纸质发票，可作为报销、推权的有效凭据。',
    address: '',
    phone: '',
    bank: '',
    account: ''
  },
  need_bill:function(){
    this.setData({
      need_bill: this.data.need_bill==1?0:1
    })
    if (this.data.need_bill == 0)
    {
      this.setData({
        /*selectid: 0,*/
        is_paper: 0,
        bill_top: '',
        is_people: 1,
        bill_content: '明细',
        identify_num: '',
        address:'',
        phone: '',
        bank: '',
        account:''
      })
    }
  },
  is_people:function(e){
    this.setData({
      is_people: e.currentTarget.dataset.index
    })
  },
  is_paper:function(e){
    this.setData({
      is_paper: e.currentTarget.dataset.index
    })
  },
 /* selectcontent:function(e){
    this.setData({
      selectid: e.currentTarget.dataset.index
    })
  },*/
  bill_top: function (e) {
    this.setData({
      bill_top: e.detail.value
    })
  },
  identify_num:function(e){
    this.setData({
      identify_num: e.detail.value
    })
  },
  bank: function (e) {
    this.setData({
      bank: e.detail.value
    })
  },
  account: function (e) {
    this.setData({
      account: e.detail.value
    })
  },
  address: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  onLoad: function (options) {
    var that =this
    that.setData({
      imgRoute: app.data.imgRoute
    })
    wx.getStorage({
      key: 'receipt',
      success: function(res) {
        console.log('发票信息',res.data)
        that.setData({
          /*selectid: res.data.selectid,*/
          bill_content: res.data.bill_content,
          bill_top: res.data.bill_top,
          is_paper: res.data.is_paper,
          is_people: res.data.is_people,
          need_bill: res.data.need_bill,
          identify_num: res.data.identify_num,
          address: res.data.address,
          phone: res.data.phone,
          bank: res.data.bank,
          account: res.data.account
        })
      },
    })
    /*wx.request({
      url: app.data.imgRoute + '/shop/show_billcontent/',
      data: {},
      method: 'GET',
      success: function (res) {
        console.log('发票组单', res)
        that.setData({
          contentlist:res.data.info,
        })
      }
    })*/
  },
  commit:function(){
    console.log('bank:',this.data.bank)
    console.log('account:', this.data.account)
    console.log('account:', this.data.account)
    console.log('phone:', this.data.phone)
    if ((this.data.need_bill == 1 && this.data.bill_top == '') || (this.data.need_bill == 1 && this.data.is_people == 0 && this.data.identify_num==''))
    {
      wx.showToast({
        title: '请填写完整发票抬头',
        image:'../../images/tip.png',
        duration:1000
      })
    }
    else{
      if (this.data.need_bill == 1 && (this.data.address == '' || this.data.bank=='' || this.data.phone=='' || this.data.account==''))
      {
        wx.showToast({
          title: '请填写完整发票内容',
          image: '../../images/tip.png',
          duration: 1000
        })
      }
      else{
        wx.setStorage({
          key: 'receipt',
          data: {
            /*selectid: this.data.selectid,*/
            need_bill: this.data.need_bill,
            is_paper: this.data.is_paper,
            bill_top: this.data.bill_top,
            is_people: this.data.is_people,
            bill_content: 'invalid',
            identify_num: this.data.identify_num,
            address: this.data.address,
            phone: this.data.phone,
            bank: this.data.bank,
            account: this.data.account
          },
        })
        wx.navigateBack({
          delta: 1
        })
      }
    }

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
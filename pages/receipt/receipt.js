// pages/receipt/receipt.js
Page({

  data: {
    bill_content:'',
    bill_top:'',
    is_paper:0,
    is_people:0,
    need_bill:1,
    contentlist: ['明细', '酒水', '生活用品'],
    selectid:0,
    contenttip:'温馨提示：建议发票内容选择明细，以保证您可以享受厂商提供的售后服务',
    identify_num:'',
    bill_top:'',
    typetip:'电子发票可作为用户报销、推权、保修的有效凭据。如您本次购买的商品暂时未实现电子发票开具，我们将自动更换为纸质普通发票。'
  },
  need_bill:function(){
    this.setData({
      need_bill: this.data.need_bill==1?0:1
    })
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
  selectcontent:function(e){
    this.setData({
      selectid: e.currentTarget.dataset.index
    })
  },
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
  onLoad: function (options) {
    var that =this
    wx.getStorage({
      key: 'receipt',
      success: function(res) {
        console.log(res.data)
        that.setData({
          bill_content: res.data.bill_content,
          bill_top: res.data.bill_top,
          is_paper: res.data.is_paper,
          is_people: res.data.is_people,
          need_bill: res.data.need_bill
        })
      },
    })
  },
  commit:function(){
    wx.setStorage({
      key: 'receipt',
      data: {
        need_bill: this.data.need_bill,
        is_paper: this.data.is_paper,
        bill_top: this.data.bill_top,
        is_people: this.data.is_people,
        bill_content: this.data.bill_content,
        identify_num: this.data.identify_num
      },
    })
    wx.navigateBack({
      delta:1
    })
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
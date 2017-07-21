// pages/trolley/trolley.js
function fomatFloat(src, pos) {
  return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
} 
var app = getApp()
Page({
  data:{
    amount:0,
    edit:0,
    selectall:0,
    orderItems: [],
    num:0,
    addr:0,
    addresslist:[],
    addrnum:-1,
    addrid:0,
    touchmove:false,
    btntext:'还差0.1元起送',
    startprice:0.1,
    commitconfirm:0
  },
  select:function(e){
    var node = this.data.orderItems[e.currentTarget.dataset.index].edit
    this.data.orderItems[e.currentTarget.dataset.index].edit = node==0?1:0
    var value = this.data.orderItems[e.currentTarget.dataset.index].num * this.data.orderItems[e.currentTarget.dataset.index].price
    value = node == 1 ?-value:value
    value = this.data.amount + value
    value = fomatFloat(value, 3)
    this.setData({
      orderItems: this.data.orderItems,
      amount: value,
      selectall: node == 1?0:this.data.selectall
    })
    if (this.data.amount < this.data.startprice)
    {
      this.setData({ btntext: '还差' + (this.data.startprice - this.data.amount) + '元起送', commitconfirm:0})
    }
    else{
      this.setData({ btntext: '提交订单', commitconfirm:1})
    }
  },
  selectall:function(e){
    var sub = this.data.orderItems
    var value = this.data.selectall
    var sum = 0
    for (var i = 0; i < sub.length;i++)
    {
      sub[i].edit = value == 0 ?1:0
      sum = value==0? (sum + sub[i].price * sub[i].num):0
    }
    sum = fomatFloat(sum,3)
  
    this.setData({
      orderItems:sub,
      selectall: value==1?0:1,
      amount: sum
    })
    if (this.data.amount < this.data.startprice) {
      this.setData({ btntext: '还差' + (this.data.startprice - this.data.amount) + '元起送', commitconfirm: 0 })
    }
    else {
      this.setData({ btntext: '提交订单', commitconfirm: 1 })
    }
  },
  edittap:function(e){
    var node=0;
    node= this.data.edit==1? 0 : 1;
    this.setData({
      edit: node
    })
  },

  comdelete:function(e){
    console.log(e)
    app.data.orderlist.splice(e.currentTarget.dataset.index, 1)
    //this.data.orderItems.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      orderItems: this.data.orderItems,
      orderItems: app.data.orderlist,
      num: this.data.num-1
    })
},
  ordersubmit:function(){
    wx.showLoading({
      title: '请等待结算',
    })
    var that =this
    var theorderlist = []
    for (var i = 0; i < that.data.orderItems.length; i++) {
      if (that.data.orderItems[i].edit > 0) {
        theorderlist.push(that.data.orderItems[i])
      }
    }
    var ordersubmit = []

    for (i = 0; i < theorderlist.length;i++)
    {
      var theorder = {}
      theorder.goods_id = theorderlist[i].goods_id
      theorder.goods_num = theorderlist[i].num
      ordersubmit.push(theorder)
    }
    console.log('提交订单', ordersubmit)
    if (theorderlist.length > 0) 
    {
      wx.setStorage({
        key: 'ordersummit',
        data: {
          amount: that.data.amount,
          goodssubmmit: ordersubmit,
          orderlist: theorderlist
        },
      })
      wx.hideLoading()
      wx.navigateTo({
        url: '../settlement/settlement',
      })
    }
    else 
    {
      if (theorderlist.length <= 0)
      {
        wx.showToast({
          title: '请选择购物车内商品',
          image: '../../images/tip.png',
          mask: true
        })
      }
      else{
        that.setData({
          addr:1
        })
      }

    }
  },

  addrpanel:function(){
   var that = this
   that.setData({
     addr:that.data.addr==1?0:1
   })
  },
  former: function () {
    if (this.data.addrid>0)
      this.setData({
        addrid:this.data.addrid-1
      })
  },
  latter:function(){
    if (this.data.addrid < (this.data.addresslist.length-1))
      this.setData({
        addrid: this.data.addrid + 1
    })
  },
  gotoaddress:function(){
    wx.navigateTo({
      url: '../addresslist/addresslist',
    })
  },
  onLoad:function(options){
    var that = this
    that.setData({
      imgRoute: app.data.imgRoute
    })
  },

  onReady:function(){

  },
  onShow:function(){

    this.setData({
      orderItems:app.data.orderlist,
      num: app.data.orderlist.length,
      selectall:0,
      addrid: 0
    })
    console.log('购物车',app.data.orderlist)
  },
  onHide:function(){
    
  },
  onUnload:function(){

  },
  onPullDownRefresh: function () {

  },
})
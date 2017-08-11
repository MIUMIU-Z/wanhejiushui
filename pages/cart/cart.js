// pages/trolley/trolley.js

function countAmount(that){
  var goods = that.data.orderItems
  var sum = 0
  for (var i = 0; i < goods.length;i++)
  {
    if (goods[i].edit==1)
    {
      sum = sum + goods[i].num * goods[i].price
      sum = fomatFloat(sum, 3)
    }
  }
  that.setData({
    amount:sum
  })
  if (sum <= 0) {
    that.setData({ commitconfirm: false })
  }
  else {
    that.setData({ commitconfirm: true })
  }
}

function fomatFloat(src, pos) {
  return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
} 
var app = getApp()
Page({
  data:{
    amount:0,
    edit:0,
    selectall:1,
    /*orderItems: [{goods_id:1,price:0.2,name:'啤酒',num:2,edit:1}],*/
    orderItems:[],
    num:0,
    touchmove:false,
    startprice:0.1,
    commitconfirm:false
  },
  select:function(e){
    var node = this.data.orderItems[e.currentTarget.dataset.index].edit
    this.data.orderItems[e.currentTarget.dataset.index].edit = node==0?1:0
   /* var value = this.data.orderItems[e.currentTarget.dataset.index].num * this.data.orderItems[e.currentTarget.dataset.index].price
    value = node == 1 ?-value:value
    value = this.data.amount + value
    value = fomatFloat(value, 3)*/
    app.data.orderlist = this.data.orderItems
    this.setData({
      orderItems: this.data.orderItems,
      /*amount: value,*/
      selectall: node == 1?0:this.data.selectall
    })
    countAmount(this)
    if (this.data.amount <=0)
    {
      this.setData({commitconfirm:false})
    }
    else{
      this.setData({commitconfirm:true})
    }
  },
  selectall:function(e){
    var sub = this.data.orderItems
    var value = this.data.selectall
    /*var sum = 0*/
    for (var i = 0; i < sub.length;i++)
    {
      sub[i].edit = value == 0 ?1:0
      /*sum = value==0? (sum + sub[i].price * sub[i].num):0*/
    }
    /*sum = fomatFloat(sum,3)*/
    app.data.orderlist = sub
    this.setData({
      orderItems:sub,
      selectall: value==1?0:1,
      /*amount: sum*/
    })
    countAmount(this)
  },
  edittap:function(e){
    var node=0;
    node= this.data.edit==1? 0 : 1;
    this.setData({
      edit: node
    })
  },
  decrease:function(e){
    console.log('减少',e.target.dataset.index)
    var index = e.target.dataset.index
    if (this.data.orderItems[index].num>1)
    {
      this.data.orderItems[index].num = this.data.orderItems[index].num-1;
      app.data.orderlist[index].num = app.data.orderlist[index].num -1;
      /*if (this.data.orderItems[index].edit==1)
      {
        this.data.amount = this.data.amount - this.data.orderItems[index].price;
        this.data.amount = fomatFloat(this.data.amount, 3)
      }*/

    }
    this.setData({
      orderItems: this.data.orderItems,
      num: this.data.orderItems.length,
      /*amount: this.data.amount*/
    })
    countAmount(this)
  },
  increase: function (e) {
    var index = e.target.dataset.index
    console.log('增加', e.target.dataset.index)
    if (this.data.orderItems[index].num <=50)
    {
      this.data.orderItems[index].num = this.data.orderItems[index].num + 1;
      app.data.orderlist[index].num = app.data.orderlist[index].num +1;
      /*if (this.data.orderItems[index].edit == 1)
      {
        this.data.amount = this.data.amount + this.data.orderItems[index].price;
        this.data.amount = fomatFloat(this.data.amount, 3)
      }*/

    }
    this.setData({
      orderItems: this.data.orderItems,
      num: this.data.orderItems.length,
      /*amount: this.data.amount*/
    })
    countAmount(this)
  },
  comdelete:function(e){
    var sub = this.data.orderItems[e.currentTarget.dataset.index]
    /*if (this.data.orderItems[e.currentTarget.dataset.index].edit == 1)
    {
      this.data.amount = this.data.amount - sub.price * sub.num
      this.data.amount = fomatFloat(this.data.amount, 3)
    }*/
    app.data.orderlist.splice(e.currentTarget.dataset.index, 1)
    this.data.orderItems.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      orderItems: this.data.orderItems,
      num: this.data.num-1,
      /*amount:this.data.amount*/
    })
    countAmount(this)
},
  ordersubmit:function(){

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

      wx.navigateTo({
        url: '../settlement/settlement?style=0',
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

    }
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
    console.log('购物车备份',app.data.orderlist)
    var sub = app.data.orderlist
    /*var sum = 0
    for (var i = 0; i < sub.length; i++) {
      sum = sum + sub[i].price * sub[i].num
    }
    sum = fomatFloat(sum, 3)*/
    var value = 1
    for (var i = 0; i < sub.length; i++)
    {
      if (sub[i].edit==0)
      {
        value = 0
      }
    }
    this.setData({ 
      orderItems:app.data.orderlist,
      num: app.data.orderlist.length,
      selectall:1,
      selectall:value
      /*amount: sum*/
    })
    countAmount(this)

    console.log('购物车',app.data.orderlist)
  },
  onHide:function(){
    
  },
  onUnload:function(){

  },
  onPullDownRefresh: function () {

  },
})
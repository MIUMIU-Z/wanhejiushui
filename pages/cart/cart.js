// pages/trolley/trolley.js
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
    btntext:'还差0.3元起送',
    startprice:0.3
  },
  select:function(e){
    var node = this.data.orderItems[e.currentTarget.dataset.index].edit
    this.data.orderItems[e.currentTarget.dataset.index].edit = node==0?1:0
    var value = this.data.orderItems[e.currentTarget.dataset.index].num * this.data.orderItems[e.currentTarget.dataset.index].price
    value = node == 1 ?-value:value
    this.setData({
      orderItems: this.data.orderItems,
      amount: this.data.amount+value,
      selectall: node == 1?0:this.data.selectall
    })
    if (this.data.amount < this.data.startprice)
    {
      this.setData({ btntext: '还差' + (this.data.startprice - this.data.amount)+'元起送'})
    }
    else{
      this.setData({ btntext: '提交订单' })
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
    this.setData({
      orderItems:sub,
      selectall: value==1?0:1,
      amount: sum
    })
    if (this.data.amount < this.data.startprice) {
      this.setData({ btntext: '还差' + (this.data.startprice - this.data.amount) + '元起送' })
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
    console.log('订单', theorderlist)
    console.log('提交订单', ordersubmit)
    console.log('地址编号', that.data.addresslist[that.data.addrid].addr_id)
    if (theorderlist.length > 0 && that.data.addrnum>0) 
    {
      //var myDate = Date.parse(new Date())
      //console.log('时间戳', myDate)
        wx.request({
          url: app.data.imgRoute + '/shop/add_order/',
          data: {
            addr_id: that.data.addresslist[that.data.addrid].addr_id,
            user_id: app.data.userid,
            money: that.data.amount,
            goods: ordersubmit,
            //time: myDate
          },
          method: 'POST',
          success: function (resu) {
            console.log('提交订单', resu)

            












            if(resu.data==1)
           {
            for (var i = 0; i < that.data.orderItems.length; i++) {
              if (that.data.orderItems[i].edit > 0) {
                that.data.orderItems.splice(i, 1)
                i = i - 1
              }
            }
            that.setData({
              orderItems: that.data.orderItems,
              num: that.data.orderItems.length,
              addr:0,
              amount:0
            })
            app.data.orderlist = that.data.orderItems
            setTimeout(function () {
              wx.hideLoading(),
                wx.showToast({
                  title: '下单成功',
                  mask: true
                })
            }, 500)

          }
          else{
              setTimeout(function () {
                wx.hideLoading(),
                  wx.showToast({
                    title: '网络错误',
                    image:'../../images/tip.png',
                    mask: true
                  })
              }, 500)
          }
          },
          complete: function () {
            wx.showLoading({
              title: '提交中',
              mask: true
            })

          
          }

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
   /*wx.request({
      url: 'http://zwx.wikibady.com/getaddress',
      data: {
        userid: app.data.userid
      },
      success: function (res) {
        console.log(res)
        var addressid = res.data.data.id
        if (res.data.note==0)
        {
          wx.navigateTo({
            url: '../address/address',
          })
        }
        else{
          console.log("提交订单商品共", theorderlist.length)
          var myDate = new Date();
          myDate = myDate.toLocaleString()
          if (theorderlist.length>0)
          {
            wx.request({
              url: imgRoute+'/shop/add_order',
              data: {
                time: myDate,
                addressid: addressid,
                userid: app.data.userid,
                orderlist: theorderlist
              },
              method: 'POST',
              success:function(e){
                console.log(e)
                for (var i = 0; i < that.data.orderItems.length; i++) {
                  if (that.data.orderItems[i].edit > 0) {
                    that.data.orderItems.splice(i, 1)
                    i = i - 1
                  }
                }
                that.setData({
                  orderItems: that.data.orderItems,
                  num: that.data.orderItems.length
                })
                app.data.orderlist = that.data.orderItems
                setTimeout(function () {
                  wx.hideLoading(),
                    wx.showToast({
                      title: '下单成功',
                      mask: true
                    })
                }, 500)
              },
              complete:function(){
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
              title: '请选择购物车内商品',
              image:'../../images/tip.png',
              mask: true
            })
          }
        }
      },
    })*/
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
    wx.request({
      url: app.data.imgRoute + '/shop/user_addrs/',
      data: {
        user_id: app.data.userid
      },
      method: 'GET',
      success: function (resu) {
        console.log('地址列表', resu)
        that.setData({
          addresslist: resu.data.infos,
          addrnum: resu.data.infos.length,
          addrid: 0
        })
      }
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
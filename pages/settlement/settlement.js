// pages/settlement/settlement.js
var app = getApp()
Page({

  data: {
    orderlist: [],
    addresslist:[],
    addrnum:-1,
    addrid:0,
    freight:0,
    amount:0,
    goodsubmmit:[],
    paymethodlist: ['货到付款','线上支付'],
    paymethod:0,
    receipt:{}
  },
  selectAddr:function(){
    wx.setStorage({
      key: 'addresslist',
      data: {
        addresslist:this.data.addresslist,
        addrid: this.data.addrid
        }
    })
    wx.navigateTo({
      url: '../settlement_addr/settlement_addr',
    })
  },
  selectPaymethod:function(e){
    console.log('paymethod', this.data.paymethod)
    console.log(e.detail.value)
    this.setData({
      paymethod:e.detail.value
    })
  },
  getremark:function(e){
    console.log(e)
  },
  gotoreceipt:function(){
    wx.navigateTo({
      url: '../receipt/receipt',
    })
  },
  onLoad: function (options) {
    var that =this
    wx.getStorage({
      key: 'ordersummit',
      success: function(res) {
        that.setData({
          goodsubmmit: res.data.goodssubmmit,
          amount: res.data.amount,
          orderlist: res.data.orderlist
        })
      },
    })
    wx.setStorage({
      key: 'receipt',
      data: {
        need_bill: 1,
        is_paper: 1,
        is_people: 1,
      },
    })

  },
  ordersubmmit:function(){
    if (this.data.addrid > (this.data.addresslist.length-1))
    {
      wx.showToast({
        title: '请选择地址',
        image:'../../images/tip.png'
      })
    }
    else
    {

    var that = this
    console.log('要提交的订单',this.data.goodsubmmit)
    console.log('要提交的地址编号', that.data.addresslist[that.data.addrid].addr_id)
    wx.request({
      url: app.data.imgRoute + '/shop/add_order/',
      data: {
        addr_id: that.data.addresslist[that.data.addrid].addr_id,
        user_id: app.data.userid,
        money: that.data.amount,
        goods: that.data.goodsubmmit,
        paymethod: that.data.paymethod
      },
      method: 'POST',
      success: function (res) {
        console.log('提交订单返回', res)
        wx.removeStorage({
          key: 'addresslist',
          success: function(res) {},
        })
        wx.removeStorage({
          key: 'selectedaddr',
          success: function (res) { },
        })

        if (res.data==0)
        {
          setTimeout(function () {
            wx.hideLoading(),
              wx.showToast({
                title: '网络错误',
                image: '../../images/tip.png',
                mask: true
              })
          }, 500)
        }
        else if (res.data==1) 
        {
          console.log('货到付款')
          setTimeout(function () {
            wx.hideLoading(),
              wx.showToast({
                title: '下单成功',
                mask: true
              })
          }, 500)
          console.log('下单前的购物车', app.data.orderlist)
          for (var i=0;i<that.data.orderlist.length;i++)
          {
            for (var j = 0; j < app.data.orderlist.length; j++)
            {
              if (that.data.orderlist[i].goods_id == app.data.orderlist[j].goods_id)
              {
                app.data.orderlist.splice(j, 1)
                break
              }
            }
          }
          console.log('下完单的购物车',app.data.orderlist)
          wx.navigateBack({
            delta:1
          })
          
        }
        else
        {
          console.log('线上支付')
          wx.requestPayment({
            timeStamp: res.data.timeStamp,
            nonceStr: res.data.nonceStr,
            package: res.data.package,
            signType: res.data.signType,
            paySign: res.data.paySign,
            success: function (res) {
              console.log('支付成功返回', res)
              wx.hideLoading()
              wx.showToast({
                title: '支付成功',
                mask: true
              })
              console.log('下单前的购物车', app.data.orderlist)
              for (var i = 0; i < that.data.orderlist.length; i++) {
                for (var j = 0; j < app.data.orderlist.length; j++) {
                  if (that.data.orderlist[i].goods_id == app.data.orderlist[j].goods_id) {
                    app.data.orderlist.splice(j, 1)
                    break
                  }
                }
              }
              console.log('下完单的购物车', app.data.orderlist)
              wx.redirectTo({
                url: '../order/order',
              })
            },
            fail: function (res) {
              console.log('支付失败返回', res)
              wx.hideLoading()
              wx.showToast({
                title: '支付失败',
                image:'../../images/tip.png'
              })
            }
          })

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
  },


  onReady: function () {

  },

  onShow: function () {
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
        console.log('结算页面地址列表', resu)
        for (var i = 0; i < resu.data.infos.length; i++) {
          if (resu.data.infos[i].remark == 1)
            break
        }
        that.setData({
          addresslist: resu.data.infos,
          addrnum: resu.data.infos.length,
        })
        var theaddrid = i
        wx.getStorage({
          key: 'selectedaddr',
          success: function (res) {
            that.setData({
              addrid: res.data
            })
          },
          fail:function(){
            console.log('记录没了')
            that.setData({
              addrid: theaddrid
            })
          }
        })
      }
    })
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
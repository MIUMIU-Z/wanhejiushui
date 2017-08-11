// pages/settlement/settlement.js
function reqfreight(that){
  console.log('运费请求地址', that.data.addresslist[that.data.addrid])
  wx.showLoading({
    title: '加载中',
    mask: true,
    difference: '正在计算运费'
  })
  wx.request({
    url: app.data.imgRoute + '/shop/transport_fee/',
    data: {
      address: that.data.addresslist[that.data.addrid].addr_id, 
      money: that.data.amount,
      goods: that.data.goodsubmmit
    },
    method: 'POST',
    success: function (res) {
      console.log('运费结果', res)
      if (res.data == -1)
      {
        that.setData({
          commitConfirm:false,
          difference:'无法下单'
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 500)
        setTimeout(function () {
          wx.showLoading({
            title: '服务器故障,请尝试重新下单',
            image:'../../images/tip.png',
            mask:true
          })
        }, 1000)
      }else{
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
        that.setData({
          freight: res.data.transport_fee,
          Actual_payment: res.data.transport_fee + that.data.amount,
          commitConfirm: res.data.permit==1?true:false,
          difference: '还差￥'+res.data.wantting+'元起送'
        })
      }
    },
    fail:function(res){
      console.log('运费结果',res)
      that.setData({
        commitConfirm: false,
        difference: '无法下单'
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 500)
      setTimeout(function () {
        wx.showLoading({
          title: '网络错误,请重新下单',
          image: '../../images/tip.png',
          mask: true
        })
      }, 1000)
    }
  })
}


var app = getApp()
Page({

  data: {
    orderlist: [],
    addresslist:[],
    addrnum:-1,
    addrid:0,
    freight:0,
    amount:0,
    discount:0,
    Actual_payment:0,
    goodsubmmit:[],
    paymethodlist: ['货到付款','线上支付'],
    paymethod:0,
    receipt:{},
    remark:'',
    difference:'',
    commitConfirm:false
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
    this.setData({
      remark:e.detail.value
    })
  },
  gotoreceipt:function(){
    wx.navigateTo({
      url: '../receipt/receipt',
    })
  },
  ordersubmmit:function(){
    if (this.data.addrid > (this.data.addresslist.length - 1) || this.data.addrid==-1)
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
    console.log('要提交的发票信息',that.data.receipt)
    wx.request({
      url: app.data.imgRoute + '/shop/add_order/',
      data: {
        addr_id: that.data.addresslist[that.data.addrid].addr_id,
        user_id: app.data.userid,
        money: that.data.Actual_payment,
        goods: that.data.goodsubmmit,
        paymethod: that.data.paymethod,
        transport_fee: that.data.freight,
        need_bill: that.data.receipt.need_bill,
        is_paper: that.data.receipt.is_paper,
        bill_top: that.data.receipt.bill_top,
        is_people: that.data.receipt.is_people,
        bill_content: that.data.receipt.bill_content,
        identify_num: that.data.receipt.identify_num,
        remark: that.data.remark
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
          success: function (res) {},
        })
        wx.removeStorage({
          key: 'receipt',
          success: function (res) {},
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
          if(that.data.style==0)
          {
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
          }
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
              if (that.data.style == 0) 
              {
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
              }
              wx.redirectTo({
                url: '../order/order?page=1',
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
    wx.request({
      url: app.data.imgRoute + '/shop/user_addrs/',
      data: {
        user_id: app.data.userid
      },
      method: 'GET',
      success: function (resu) {
        console.log('结算页面地址列表', resu)
        var addrlength = resu.data.infos.length
        for (var i = 0; i < addrlength; i++) {
          if (resu.data.infos[i].remark == 1)
            break
        }
        that.setData({
          addresslist: resu.data.infos,
          addrnum: addrlength,
        })
        var theaddrid = i
        wx.getStorage({
          key: 'selectedaddr',
          success: function (res) {
            that.setData({
              addrid: res.data
            })
            reqfreight(that)
          },
          fail:function(){
            console.log('记录没了')
            if (addrlength!=0)
            {
              that.setData({
                addrid: theaddrid
              })
              reqfreight(that)
            }
            else{
              that.setData({
                difference: '请选择地址'
              })
            }
          }
        })
      }
    })
    wx.getStorage({
      key: 'receipt',
      success: function (res) {
        console.log('发票信息',res.data)
        that.setData({
          receipt:res.data
        })
      },
    })
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      style: options.style,
      imgRoute: app.data.imgRoute
    })
    wx.getStorage({
      key: 'ordersummit',
      success: function (res) {
        console.log('订单商品',res.data.goodssubmmit)
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
        selectid:0,
        need_bill: 0,
        is_paper: 1,
        is_people: 1,
        bill_content: '',
        bill_top: '',
        identify_num: ''
      },
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
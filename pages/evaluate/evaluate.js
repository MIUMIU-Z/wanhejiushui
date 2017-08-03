// pages/evaluate/evaluate.js
function getitem(that, order_id, user_id,style){
  wx.request({
    url: that.data.imgRoute + '/shop/add_order_comment/',
    data: {
      order_id: order_id,
      user_id: user_id
    },
    success: function (res) {
      console.log('评价项目返回', res.data.info)
      var sign = true
      for (var i = 0; i < res.data.info.length; i++) {
        res.data.info[i].star = 0
        res.data.info[i].text = ''
        res.data.info[i].anony = 0
        res.data.info[i].img = []
        res.data.info[i].imgnum = 0
        if (res.data.info[i].is_opinion==0)
          sign = false
      }
      if (sign)
      {
        wx.navigateBack({
          delta:1
        })
      }
      else{
        that.setData({
          goods: res.data.info,
        })
        if (style == 1) {
          wx.hideLoading()
          setTimeout(function () {
            wx.showToast({
              title: '上传成功'
            })
          }, 500)
        }
      }

    }
  })
}

var app = getApp()
Page({

  data: {
    goods: [],
    orderid:-1,
    placeholder:'说说你的体验，分享给想买的他们吧！(最多230字)',
    anonytip: ['你的评论能帮助其他小伙伴呦','你写的评论会以匿名的形式展现'],
    speedstar:0,
    servicestar:0
  },
  selectanony:function(e){
    var index = e.currentTarget.dataset.index
    this.data.goods[index].anony = this.data.goods[index].anony==0?1:0
    this.setData({
      goods: this.data.goods
    })
  },
  changeimg:function(e){
    var that = this
    var index = e.currentTarget.dataset.index
    wx.chooseImage({
      count: 1,
      sizeType: [
        'original', 'compressed'
      ],
      sourceType: [
        'album', 'camera'
      ],
      success: function (res) {
        console.log(res.tempFilePaths)
        that.data.goods[index].img[e.currentTarget.dataset.imgid] = res.tempFilePaths[0]
        console.log(that.data.goods)
        that.setData({
          goods: that.data.goods,
        });
      },
    })
  },
  selectimg:function(e){
    var that = this
    var index = e.currentTarget.dataset.index
    wx.chooseImage({
      count: 2 - that.data.goods[index].imgnum,
      sizeType: [
        'original', 'compressed'
      ],
      sourceType: [
        'album', 'camera'
      ],
      success: function(res) {

        console.log(res.tempFilePaths)
        that.data.goods[index].img = that.data.goods[index].img.concat(res.tempFilePaths) 
        that.data.goods[index].imgnum = that.data.goods[index].img.length
        console.log(that.data.goods)
        that.setData({
           goods: that.data.goods,
         });
      },
    })
  },
  
  speedstar:function(e){
    if (this.data.speedstar == 1 && e.currentTarget.dataset.star == 1)
      this.data.speedstar = 0
    else
      this.data.speedstar = e.currentTarget.dataset.star
    this.setData({
      speedstar: this.data.speedstar
    })
  },
  servicestar:function(e){
    if (this.data.servicestar == 1 && e.currentTarget.dataset.star == 1)
      this.data.servicestar = 0
    else
      this.data.servicestar = e.currentTarget.dataset.star
    this.setData({
      servicestar: this.data.servicestar
    })
  },
  selectstar:function(e){
    var index = e.currentTarget.dataset.index
    if (this.data.goods[index].star == 1 && e.currentTarget.dataset.star==1)
      this.data.goods[index].star =0
    else
      this.data.goods[index].star = e.currentTarget.dataset.star
    this.setData({
      goods: this.data.goods
    })
  },
  gettext: function (e) {
    this.data.goods[e.currentTarget.dataset.index].text = e.detail.value
    this.setData({
      goods: this.data.goods
    })
  },
  commit:function(e){
    var that =this
    /*console.log(that.data.speedstar)
    console.log(that.data.servicestar)
    console.log(that.data.goods)*/
    var index = that.data.goods[e.currentTarget.dataset.index]
    console.log(that.data.goods[e.currentTarget.dataset.index])
    wx.showLoading({
      title: '正在提交',
      mask:true
    })
    console.log('上传图片', index.img[0])
    if (index.img.length==0)
    {
      wx.request({
        url: app.data.imgRoute + '/shop/add_goods_comments/',
        data:{
          goods_id: index.goods_id,
          order_id: that.data.orderid,
          user_id: app.data.userid,
          commemt_content: index.text,
          score: index.star,
          is_annoymity: index.anony
        },
        method:'POST',
        
        header:{
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
        success: function (res) {
          console.log('上传评论成功', res)
          if (res.data==0)
          {
            wx.hideLoading()
            setTimeout(function () {
              wx.showToast({
                title: '数据错误，请联系客服人员重试',
                image: '../../images/tip.png',
                mask: true
              })
            }, 500)
          }
          else{
            getitem(that, that.data.orderid, app.data.userid, 1)
          }

        },
        fail: function (res) {
          console.log('上传评论失败', res)
          wx.hideLoading()
          setTimeout(function () {
            wx.showToast({
              title: '网络错误',
              image: '../../images/tip.png',
              mask: true
            })
          }, 500)
        }
      })
    }
    else
    {
      wx.uploadFile({
        url: app.data.imgRoute + '/shop/add_goods_comments/',
        filePath: index.img.length > 0 ? index.img[0] : '',
        name: "comment_img1",
        formData: {
          goods_id: index.goods_id,
          order_id: that.data.orderid,
          user_id: app.data.userid,
          commemt_content: index.text,
          score: index.star,
          is_annoymity: index.anony
        },
        success: function (res) {
          console.log('提交评论成功', res)
          if (res.data == 0) {
            wx.hideLoading()
            setTimeout(function () {
              wx.showToast({
                title: '上传失败，数据错误',
                image: '../../images/tip.png',
                mask: true
              })
            }, 500)
          }
          else {
            if (index.img.length < 2) {
              getitem(that, that.data.orderid, app.data.userid, 1)
            }
            else {
              console.log('上传图片', index.img[1])
              wx.uploadFile({
                url: app.data.imgRoute + '/shop/add_goods_comment_img/',
                filePath: index.img[1],
                name: "comment_img2",
                formData: {
                  goods_id: index.goods_id,
                  order_id: that.data.orderid,
                  user_id: app.data.userid,
                },
                success: function (res) {
                  console.log('提交图片返回', res)
                  getitem(that, that.data.orderid, app.data.userid, 1)
                },
                fail: function (res) {
                  console.log('提交图片返回', res)
                  wx.hideLoading()
                  setTimeout(function () {
                    wx.showToast({
                      title: '网络错误',
                      image: '../../images/tip.png',
                      mask: true
                    })
                  }, 500)
                }
              })
            }
          }
        },
        fail: function (res) {
          console.log('提交图片失败', res)
          wx.hideLoading()
          setTimeout(function () {
            wx.showToast({
              title: '网络错误',
              image: '../../images/tip.png',
              mask: true
            })
          }, 500)
        }
      })
    }
  },

  
  onLoad: function (options) {
    var that = this
    console.log(options)
    that.setData({
      imgRoute: app.data.imgRoute,
      orderid: options.id
    })
    getitem(that, options.id, app.data.userid,0)
    /*wx.getStorage({
      key: 'selectedorder',
      success: function (res) {
        that.setData({
          order: res.data,
        })
        wx.request({
          url: app.data.imgRoute + '/shop/show_order_goods_info/',
          data: {
            order_id: res.data.order_id
          },
          method: 'GET',
          success: function (res) {
            console.log('订单详情', res)
            for (var i = 0; i < res.data.infos.length;i++)
            {
              res.data.infos[i].imgnum=0
              res.data.infos[i].img =[]
              res.data.infos[i].star = 0
              res.data.infos[i].anony = 0
              res.data.infos[i].text = ''
            }
            that.setData({
              goods: res.data.infos,
              goodsnum: res.data.infos.length
            })
          }
        })
      },
    })*/
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
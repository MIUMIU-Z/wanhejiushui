// pages/goodslist/goodslist.js
function search(that,search,style){
    that.setData({
      loading:true
    })
    wx.request({
      url: that.data.imgRoute + '/shop/goods_search/',
      data: {
        keyword: search,
        style:style
      },
      method: 'GET',
      success: function (res) {
        console.log('查询结果', res)
        if (res.data.null == 1) {
          that.setData({
            loading: false,
            num:-1
          })
          wx.hideLoading()
          setTimeout(function () {
            wx.showToast({
              title: '服务器错误',
              image: '../../images/tip.png',
              mask: true
            })
          }, 500)
        }
        else {
          setTimeout(function () {
            wx.hideLoading()
          }, 500)
          if (res.data.infos.length > 0)
          {
            wx.setNavigationBarTitle({
              title: '搜索结果',
            })
          }
          that.setData({
            loading: false,
            searchpanel: res.data.infos.length>0?0:1,
            result: res.data.infos,
            backups: res.data.infos,
            SearchBoolen: true,
            num: res.data.infos.length,
            style: style
          })
        }
      },
      fail: function () {
        that.setData({
          loading: false,
          num: -1
        })
        wx.hideLoading()
        setTimeout(function () {
          wx.showToast({
            title: '服务器错误',
            image: '../../images/tip.png',
            mask: true
          })
        }, 500)
      },
      complete: function () {
        wx.showLoading({
          title: '查询中',
          mask: true
        })
      }
    })
}

function getgoodslist(that,brand_id,style){
  that.setData({
    loading: true
  })
  wx.request({
    url: app.data.imgRoute + '/shop/goods_class/',
    data: {
      brand_id: brand_id,
      style: style
    },
    method: 'GET',
    success: function (res) {
      console.log('商品列表', res)
      that.setData({
        result: res.data.infos,
        backups: res.data.infos,
        SearchBoolen: false,
        loading: false
      })
    }
  })
}

var app = getApp()
Page({

  data: {
     num:-1,
     searchpanel:-1,
     search:'',
     imgRoute: '',
     price:['',''],
     style: 0 /*0:综合,1:销量,2:价格(从低到高),3:价格(从高到低),4:筛选*/,
     recommend_list: [],
     result: [],
     backups:[],
     SearchBoolen:false,
     loading:true,
     vertical: 0,
     typeid:-1,
     windowHeight:0,
     windowWidth:0
  },

  getlow:function(e){
    this.data.price[0]=e.detail.value
    this.setData({
      price: this.data.price
    })
  },
  gethigh: function (e) {
    this.data.price[1] = e.detail.value
    this.setData({
      price: this.data.price
    })
  },
  filter:function(e){
    var that =this
    var low = 0
    var high = 0
    if (this.data.price[0] == '')
    {
      low = -1
    }
    else{
      low = parseFloat(this.data.price[0])
    }

    if (this.data.price[1] == '') {
      high = 99999
    }
    else {
      high = parseFloat(this.data.price[1])
    }
    console.log('筛选信息',this.data.price)
    if (high < low)
    {
      wx.showToast({
        title: '请正确输入',
        image:'../../images/tip.png',
        mask: true
      })
    }
    else{
      that.setData({
        loading:true,
        result : []
      })
      var thebackups = that.data.backups
      for (var i = 0; i < thebackups.length;i++)
      {
        if (thebackups[i].price > low && thebackups[i].price <high)
          that.data.result.push(thebackups[i])
      }
      that.setData({
        result: that.data.result,
        loading: false,
      })
    }
  },
  tosearch:function(){
    var that = this
    this.setData({
      searchpanel: 1,
      loading:true
    })
    wx.setNavigationBarTitle({
      title: '商品搜索',
    })
    wx.request({
      url: app.data.imgRoute + '/shop/show_reconmend_search/',
      data: {},
      method: 'GET',
      success: function (res) {
        console.log('推荐搜索', res)
        that.setData({
          recommend_list:res.data.infos,
          loading: false
        })
      }
    })
  },
  getinput: function (e) {
    this.setData({
      search: e.detail.value
    })
  },
  getresult: function () {
    console.log('查询内容', this.data.search)
    if (search != "") 
    {
      search(this,this.data.search,0)
    }
    else {
      wx.showToast({
        title: '请填写搜索内容',
        image: '../../images/tip.png',
        mask: true,
        duration: 1200
      })
    }
  },
  changestyle: function (e) {
    var sub = e.currentTarget.dataset.index
    var that = this
    if (sub == 2) {
      sub = this.data.style == 2 ? 3 : 2
    }
    this.setData({
      style: sub
    }) 
    if (sub!=4)
    {
      if (that.data.SearchBoolen)
        search(this, this.data.search, sub)
      else
        getgoodslist(this, that.data.typeid, sub)
    }
    else
    {
      that.setData({
        price: ['', '']
      })
    }
  },
  clicksearch: function (e) {
    var that =this
    var index = e.currentTarget.dataset.index
    console.log('查询内容', this.data.recommend_list[index])
    setTimeout(function(){
      that.setData({
        search: that.data.recommend_list[index]
      })
    },500)
    search(this, this.data.recommend_list[index],0)
  },
  gotodetail: function (e) {
    var that = this
    console.log(e.currentTarget.dataset.index)
    wx.setStorage({
      key: 'selectedgoods',
      data: that.data.result[e.currentTarget.dataset.index],
    })
    wx.navigateTo({
      url: '../detail/detail',
    })
  },

  onLoad: function (options) {
    console.log(options)
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })  
    this.setData({
      searchpanel: options.id<0?1:0,
      imgRoute: app.data.imgRoute,
      typeid:options.id
    })
    if (options.id >= 0)
    {
      wx.setNavigationBarTitle({
        title: '商品列表',
      })
      getgoodslist(that, options.id, 0)
    }
    else{
      wx.setNavigationBarTitle({
        title: '商品搜索',
      })
      wx.request({
        url: app.data.imgRoute + '/shop/show_reconmend_search/',
        data: {},
        method: 'GET',
        success: function (res) {
          console.log('推荐搜索', res)
          that.setData({
            recommend_list: res.data.infos,
            loading: false
          })
        }
      })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
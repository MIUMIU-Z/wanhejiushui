//index.js
//获取应用实例
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loadcount: 0,
    loaded: 0,
    indicatorDots: "true",
    autoplay: "true",
    interval: 3000,
    duration: 500,
    qrcode: "http://wxdata-1253783629.costj.myqcloud.com/wanhe/qr.jpg",
    isshow: false,
    isqrshow: false,

    name: null,
    intruduce: null,
    curImg: "",
    images: [],
    comListInfo: [],
    address: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  goaddr: function () {
    var that = this;
    wx.openLocation({
      latitude: that.data.address["lat"],
      longitude: that.data.address["long"],
      scale: 18,
      name: that.data.address.name,
      address: that.data.address.address
    })

  },
  gocall: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.comListInfo[2]["text"] //仅为示例，并非真实的电话号码
    })
  },

  goourcall: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: "13945103823" //仅为示例，并非真实的电话号码
    })
  },

  popImg: function (e) {
    var that = this;
    console.log(e);
    that.setData({
      isshow: true,
      curImg: that.data.images[e.currentTarget.id]
    });

  },
  delImg: function () {
    var that = this;
    that.setData({
      isshow: false,
      curImg: ""
    });
  },

  popQr: function () {
    var that = this;
    that.setData({
      isqrshow: true
    });
  },

  delQr: function () {
    var that = this;
    that.setData({
      isqrshow: false
    });
  },

  /*
  downloadImg:function() {
    var that = this;
    wx.getSetting({
      success(res) {
        //console.log(res['scope.writePhotosAlbum']);
        if (!res.authSetting['scope.writePhotosAlbum']) {
          console.log("enter1");
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              console.log("enter11");
              wx.getImageInfo({
                src: that.data.qrcode,
                success: function(res) {
                  console.log(res);
                  wx.saveImageToPhotosAlbum({
                    filePath: res.path,
                    success(res) {
                      console.log(res);
                    }
                  });
                }
              });
              
            }
          });
        } else {
            console.log("enter2");
            wx.getImageInfo({
              src: that.data.qrcode,
              success: function (res) {
                console.log("111",res);
                var url = res.path;
                console.log(typeof(url));
                wx.saveImageToPhotosAlbum({
                  filePath: url,
                  success:function(res) {
                    console.log(res);
                    wx.showToast({
                      title: '成功保存',
                      icon: 'success',
                      duration: 500
                    });

                  },
                  fail:function(res) {
                    console.log("222",url);
                    console.log(res);
                    wx.showToast({
                      title: '保存失败',
                      icon: 'success',
                      duration: 500
                    });
                  }
                });
              }
            });
        }
      }
    });
  },
  */

  loadingImg: function (e) {
    //console.log(e);
    var that = this;
    that.setData({
      loadcount: that.data.loadcount + 1
    }
    );
    if (that.data.loadcount == that.data.images.length) {
      setTimeout(function () {
        that.setData({
          loaded: 1
        }
        );
      }, 1000)
    }

  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      imgRoute: app.data.imgRoute
    })
    //请求数据
    wx.request({
      url: app.data.imgRoute + '/shop/show_shopinfo/',
      success: function(res) {
        console.log('商家信息返回',res)
        that.setData({
          name: res.data.infos.name,
          intruduce: res.data.infos.introduction,
          images: res.data.img,
          comListInfo: [{
            icon: 'http://wxdata-1253783629.costj.myqcloud.com/common/address.png',
            icon1: 'http://wxdata-1253783629.costj.myqcloud.com/common/addrgo.png',
            text: res.data.infos.location,
            isunread: true,
            unreadNum: 2
          }, {
            icon: 'http://wxdata-1253783629.costj.myqcloud.com/common/time.png',
            text: res.data.infos.open_time,
            isunread: false,
            unreadNum: 2
          }, {
            icon: 'http://wxdata-1253783629.costj.myqcloud.com/common/phone1.png',
            icon1: 'http://wxdata-1253783629.costj.myqcloud.com/common/call1.png',
            text: res.data.infos.phone,
            isunread: true,
            unreadNum: 1
          }],
          address: {
            lat: res.data.infos.lat,
            long: res.data.infos.long,
            name: res.data.infos.name,
            location: res.data.infos.location
          }


        });
      }
    });
    //设置
    //wx.setNavigationBarTitle({
    //  title: this.data.name
    // });



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
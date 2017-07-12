Page({
  data:{
    introduce:"",
    contact_way:{},
    comimage:[],

  },
  onLoad:function(options){
    
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow:function(){
    var that = this;
    wx.request({
      url: 'http://zwx.wikibady.com/getcominfo',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          introduce: res.data.intro,
          contact_way: res.data,
        })
        wx.request({
          url: 'http://zwx.wikibady.com/getcomimg',
          data: {
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res)
            that.setData({
              comimage: res.data,
            })
          }
        })
      }
    })

  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
  
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数

  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})
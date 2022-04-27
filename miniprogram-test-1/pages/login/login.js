// pages/login/login.js
const app = getApp()
var host = app.globalData.host;
var timerMsg;//消息显示定时器
var msgTTL = 1000;//上述定时器的计时时间

Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgUnvisable:true,
    nickname:'',
    password:'',
      im1:'http://qty83k.creatby.com/materials/origin/753631f21d00a44e67b111f71b24811d_origin.jpg',
      im2:'http://qty83k.creatby.com/materials/origin/d6a662acf8888a67887ae3abb1fe1aac_origin.jpg',
      im3:'http://qty83k.creatby.com/materials/origin/4e3675d307eb837f998dd5cad22ebe83_origin.jpg',
  },
  input_name:function(e){
    this.setData({
      nickname:e.detail.value
    })
  },
  input_pwd:function(e){
    this.setData({
      password:e.detail.value
    })
  },
  register:function(){
    wx.navigateTo({
      url: '../register/register',
    })
  },
  submitButton:function(){
    var that = this;

    if(that.data.nickname==""||that.data.password=="")
    {
      that.showMsg("哥也是有头有脸的人，请输入用户名和密码，谢谢！🤔",3000);
    }
    else{
      app.globalData.nickname=this.data.nickname;
      wx.showLoading({
        title: '连接中...',
      });
      wx.request({
        url: host+'/web/user/login',
        method:"get",
        header: { 'content-type':'application/x-www-form-urlencoded'},
        data:{
          'name':that.data.nickname,
          'password':that.data.password
        },
        success:function(res){
          var resData = res.data;
          if(resData == true){
            wx.request({
              url: host + '/web/collect/fgByname',
              data:
              {
                u_nickname: that.data.nickname
              },
              success: function (res) {
                  if (res.data.length>0)app.globalData.collectionList = res.data[0].goodsList;
                // console.log("收藏", app.globalData.collectionList);
                setTimeout(function () {
                  wx.switchTab({
                    url: '../main/main',
                  });
                }, 1000);
                wx.setStorageSync("nickname", that.data.nickname);//登录成功保存用户名              
                wx.setStorageSync("need_login", "no");
                var timestamp = Date.parse(new Date());//获取当前时间
                var expiration = timestamp + 7 * 24 * 60 * 60 * 1000; //准备缓存七天
                wx.setStorageSync("data_expiration", expiration);
                wx.hideLoading();
                that.showMsg("登录成功！即将跳转至首页！");
              },
              fail: function () {
                that.showMsg("网络连接好像出了点问题...😭", 3000);
                return;
              }
            });
          } else {
            wx.hideLoading();
          that.showMsg("好像出了点问题，让咱再对对口令？🙁",3000);
          }
        },
        fail:function()
        {
          wx.hideLoading();
          that.showMsg("找不到服务器，先检查一下网络？😥", 3000);
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //记录时间缓存登录状态
    var timestamp = Date.parse(new Date());//获取当前时间
    var expiration = timestamp + 7 * 24 * 60 * 60 * 1000; //准备缓存七天
    //   var expiration = timestamp + 10 * 1000; //缓存十秒测试
    var data_expiration = wx.getStorageSync("data_expiration");
    var needLogin=wx.getStorageSync("need_login");
    
    if (data_expiration && needLogin=="no") {
      //说明登录过
      if (timestamp > data_expiration) {
        //说明超过七天，则需要重新设置缓存，意味着需要重新登录
        wx.setStorageSync("need_login", "yes");
        wx.setStorageSync("data_expiration", expiration);
      }
      else {
        wx.setStorageSync("need_login", "no");
      }
    }
    else {
      //说明没有登录过
      wx.setStorageSync("need_login", "yes");
      // wx.setStorageSync("data_expiration", expiration);
    }

    if (wx.getStorageSync("need_login") == "no") {
      wx.switchTab({
        url: '../main/main',
      });
    }
    
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

  },
  /*显示消息*/
  showMsg(m, msgTTL = 1000) {
    var that = this;
    that.setData({ msg: m });//设置消息
    that.setData({ msgUnvisable: false });//消息可见
    clearTimeout(timerMsg);
    timerMsg = setTimeout(function () {
      that.setData({ msgUnvisable: true });//消息不可见
    }, msgTTL);
  }
})
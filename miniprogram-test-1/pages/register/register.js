// pages/register/register.js
const app = getApp();
var host = app.globalData.host;

Page({

  data: {
    passWord: '',
    rePassword: '',
    username: ''
  },

  handleUsername: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  //  处理第一次的密码
  handlepassword: function (e) {
    console.log(e);
    this.setData({
      passWord: e.detail.value
    })
  },
  // 处理第二次密码
  handleRePassword: function (e) {
    console.log(e);
    this.setData({
      rePassword: e.detail.value
    })

  },

  submitButton: function () {
    console.log("点击按钮！" + "获取到的用户名:" + this.data.username + "获取到的密码:" + this.data.password)
    var that = this;

    if (this.data.username == '') {
      wx.showToast({
        title: '用户名不能为空',
        image: '/image/huaji.png',
        duration: 2000
      })
      return
    }
    else if (this.data.passWord != this.data.rePassword) {
      wx.showToast({
        title: '两次密码不一致',
        image: '/image/figure.png',
        duration: 2000
      })
      return
    }

    else if (this.data.passWord == '') {
      wx.showToast({
        title: '请输入密码',
        image: '/image/nule.png',
        duration: 2000
      })
      return
    }

    else{

    wx.showLoading({
      title: '连接中...'
    });
    wx.request({
        url: host +'/web/user/register',
      method: "get",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        'name': that.data.username,
        'password': that.data.passWord
      },
      success: function (res) {
        console.log("回调函数:" + res.data)
        var resData = res.data;
        wx.hideLoading();
        if (resData == true) {
          wx.showToast({
            title: '注册成功',
            duration: 2000,
            mask:true,
            success:function(){
              setTimeout(function (){
                wx.redirectTo({
                  url: '../login/login',
                });
              },2000)
            }
          })
        } else {
          wx.showToast({
            title: '用户名已被占用！',
            icon:'none',
            duration: 2000
          });
        }
      },
      fail:function(res)
      {
        wx.hideLoading();
        wx.showToast({
          title: '网络请求失败',
          image:"/image/close.png"
        });
      }
    })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
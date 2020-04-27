// pages/confirmOrder/confirmOrder.js
const app = getApp();
var host = app.globalData.host;
var util = require('../../utils/util.js')
var userName; //用户名
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prices: 0,
    time: "",
    timeNum: "",
    address: "",
    tel: "",
    username: "",
    u_id: 0,
    orderID: '',
    ordersList: [],
    goodsList: []
  },

  upAddr: function() {
    wx.navigateTo({
      url: '../profile/address/address', //1表示从订单确认页前往
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    userName = wx.getStorageSync("nickname");
    //查询这个用户昵称下的信息
    wx.request({
      url: host + '/web/user/selectByname',
      method: "get",
      data: {
        name: userName
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data),
          that.setData({
            username: res.data.u_username,
            address: res.data.u_address,
            tel: res.data.u_tell,
            u_id: res.data.u_id
          })
      },
      fail: function() {
        wx.showToast({
          title: "服务器走丢了!",
          icon: 'none',
        })
      }
    })
    //从购物车的本地缓存中获取商品的列表信息,得到的是一个二维数组
    wx.getStorage({
      key: userName + 'newOrder',
      success: function(res) {
        var list = res.data;
        that.setData({
          goodsList: list
        });
        // 计算商品总价
        var count = 0;
        for (var i = 0; i < list.length; i++) {
          count = count + list[i].goodsPrice * list[i].inCartCount;
        }
        that.setData({
          prices: count.toFixed(2)
        });
      },
    })
  },

  //点击提交按钮，将订单信息返回后台数据库:返回一次
  bindSubmitOrder: function(e) {
    var that = this;

    //获取 util.js 中设置的当前日期和时间:yyyy-MM-dd
    var TIME = util.formatTime(new Date());
    this.setData({
      time: TIME,
    });
    //获取 util.js 中设置的当前日期和时间的纯数字字符串:yyyyMMdd
    var TimeNum = util.formatDate(new Date());
    this.setData({
      timeNum: TimeNum,
    });
    //判断是否填写了个人信息
    var name = this.data.username;
    var tel = this.data.tel;
    var address = this.data.address;
    if (name == undefined || tel == undefined || address == undefined || tel == "undefined" || address == "undefined") {
      wx.showToast({
        title: '请填写个人信息！',
        icon: "none",
        duration: 2000
      });
      return;
    }

    //返回生成订单列表
    else {
      wx.request({
        url: host + '/web/orderform/createOrd',
        method: "get",
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          timeNum: that.data.timeNum,
          time: that.data.time,
          uid: that.data.u_id,
          prices: that.data.prices,
          address: that.data.address,
          tel: that.data.tel

        },
        success: function(res) {
          // console.log("生成的订单信息：" + res.data[0].orderID);
          console.log("回调函数：" + res.data[0].orderID)
          that.setData({
            orderID: res.data[0].orderID
          })
          console.log(that.data.orderID)

          //重新设置一个只保存了goodsID和goodsNum的列表
          var ordersList = that.data.ordersList;
          var ordersList2 = that.data.goodsList;
          var orderID = that.data.orderID;
          // console.log(orderID);
          // ordersList[0].push({"orderID":orderID}),
          console.log(orderID);
          // console.log(ordersList2);
          // for (var i = 0; i < ordersList2.length; i++) {
          //     ordersList[i].push({"orderID": orderID});
          //     ordersList[i].push({"goodsID": ordersList2[i].goodsID});
          //     ordersList[i].push({"goodsnum": ordersList2[i].inCartCount});
          // }
          // that.setData({
          //     ordersList: ordersList
          // });

          // 给ordersList中添加键值对生成需要返回的数组参数
          for (var index in ordersList2) {
            var orderIDParam = "ordersList[" + index + "].orderID"
            var goodsIDParam = "ordersList[" + index + "].goodsID"
            var goodsnumParam = "ordersList[" + index + "].goodsnum"
            that.setData({
              [orderIDParam]: orderID,
              [goodsIDParam]: ordersList2[index].goodsID,
              [goodsnumParam]: ordersList2[index].inCartCount,
            })
          }
          console.log(ordersList);
          // console.log(that.data.orderID);

          let newData = {
            ordersList: JSON.stringify(that.data.ordersList)
          }
          console.log(newData.ordersList)

          //返回订单内容表 
          wx.request({
            url: host + '/web/order/updAll',
            method: "get",
            header: {
              'content-type': 'application/json' // 默认值
            },
            data: {
              // orderID:that.data.orderID,
              // ordersList: that.data.ordersList,
              ordersList: newData.ordersList
            },
            success: function(res) {
              console.log("回调函数：" + res.data)


              //Remove购物车被购买商品缓存
              var u_list = wx.getStorageSync(userName + '_goods')
              var o_list = wx.getStorageSync(userName + 'newOrder')
              for (var i = 0; i < u_list.length; i++) {
                for (var j = 0; j < o_list.length; j++) {
                  if (u_list[i].goodsID == o_list[j].goodsID) {
                    u_list.splice(i, 1)
                  }

                }
              }
              wx.setStorage({
                key: userName + '_goods',
                data: u_list,
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
              })

              //跳转至 order3  订单展示页面
              wx.redirectTo({
                url: '../order3/order3',
              });
            },
            fail: function() {
              wx.showToast({
                title: "服务器走丢了!",
                icon: 'none',
              })
            }
          })
        },
        fail: function() {
          wx.showToast({
            title: "服务器走丢了!",
            icon: 'none',
          })
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.onLoad()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
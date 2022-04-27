// pages/store/store.js
const app = getApp();
var host = app.globalData.host;
var timerMsg;//消息显示定时器
var msgTTL = 1000;//上述定时器的计时时间
var userName;//用户名

/*goods结构体声明 */
function Goods() {
  this.goodsID = "";
  this.goodsName = "";
  this.goodsPrice = 0;
  this.goodsImage = "";
  this.inCartCount = 0;
  this.goodsStock=0;
  this.selected=false;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 1,
    currentTab: 1,
    name: "默认",
    goodsList: null,
    cartList: [] ,
    msgUnvisable: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    userName = app.globalData.nickname;

    wx.showLoading({
      title: '加载中...',
    });
    wx.request({
      url: host + '/web/goods/findFront',
      method: 'get',//请求类型
      data: {//请求的参数

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        //this在请求中不能使用 需要定义一个变量 that 来代替this
        // console.log(res.data)
        that.setData({
          goodsList: res.data
        })
        wx.hideLoading();
      },
      fail: function () {
        wx.hideLoading();
        that.showMsg("咱家服务器似乎走丢了，稍后再刷新试试吧？╰(￣ω￣ｏ)", 3000);
      }
    })
  },

  /*左侧分类列表点击的响应*/
  switchNav: function (e) {
    var page = this;
    var id = e.target.id;
    if (this.data.currentTab == id) {
      return false;
    } else {
      page.setData({ currentTab: id });
    }
    page.setData({ flag: id });
  },
//点击商品进入商品详情
showDetil:function(e)
{
  var data = e.currentTarget.dataset.data;
  var goodsID =data.goodsID;
  wx.navigateTo(
    {
      url: '../goods/goods?goodsID=' + goodsID
    });
},
/*加购操作*/
addToCart:function(e)
{
  var that = this;
  this.setData({ cartList: [] });
  var goodsChicked=e.currentTarget.dataset.data2;
  if (goodsChicked.g_stock == 0) that.showMsg("抱歉！咱家没货了。。。\n<(＿　＿)>", 2000);//没库存了就不加购了
  else {
    wx.getStorage(
      {
        key: userName + '_goods',
        success: function (res) {
          that.setData({ cartList: res.data });
          var list = that.data.cartList;
          var goods = new Goods();
          goods.goodsID = goodsChicked.goodsID;
          goods.goodsName = goodsChicked.g_goodsname;
          goods.goodsPrice = goodsChicked.g_goodsprice;
          goods.goodsImage = goodsChicked.g_front;
          goods.goodsStock=goodsChicked.g_stock;

          var flag = false;//设置标志是否该用户的购物车里存在该商品
          for (var i = 0; i < list.length; i++) {
            if (list[i].goodsID == goods.goodsID) {
              list[i].inCartCount++;
              goods.inCartCount = list[i].inCartCount;
              if(goods.inCartCount>goods.goodsStock)
              {
                that.showMsg("抱歉！咱家货就这么多了。。。\n<(＿　＿)>", 2000);//没库存了就不加购了
                return;
              }
              flag = true;
              break;
            }
          }
          if (flag == false) {
            goods.inCartCount = 1;
            that.setData({ cartList: that.data.cartList.concat(goods) });
            list = that.data.cartList;
          }
          wx.setStorage(
            {
              key: userName + "_goods",
              data: list
            });
          that.showMsg("(≧∇≦)ﾉ" + goods.goodsName + "加购成功!\n");
        },
        fail: function ()//若该用户的购物车里无数据，则新建添加
        {
          var goods = new Goods();
          goods.goodsID = goodsChicked.goodsID;
          goods.goodsName = goodsChicked.g_goodsname;
          goods.goodsPrice = goodsChicked.g_goodsprice;
          goods.goodsImage = goodsChicked.g_front;
          goods.goodsStock = goodsChicked.g_stock;
          goods.inCartCount = 1;
          wx.setStorage(
            {
              key: userName + "_goods",
              data: that.data.cartList.concat(goods)
            });
          that.showMsg("(≧∇≦)ﾉ" + goods.goodsName + "加购成功!\n");
        }
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
      this.onLoad();
      var defShow = app.globalData.defaultStoreShowKind;
      this.setData({ flag: defShow, currentTab: defShow });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
      this.onLoad();
      wx.stopPullDownRefresh();
  },

  /*显示消息*/
  showMsg(m, msgTTL = 1000)
  {
    var that = this;
    that.setData({ msg: m });//设置消息
    that.setData({ msgUnvisable: false });//消息可见
    clearTimeout(timerMsg);
    timerMsg = setTimeout(function () {
      that.setData({ msgUnvisable: true });//消息不可见
    }, msgTTL);
  }
})

const app = getApp();
var host = app.globalData.host;
var userName;

/*goods结构体声明 */
function Goods() {
  this.goodsID = "";
  this.goodsName = "";
  this.goodsPrice = 0;
  this.goodsImage = "";
  this.inCartCount = 0;
  this.goodsStock = 0;
  this.selected = false;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
      searchCon:'',
      disableOrnot:true,
      goodsList:[],
      cartList:[]
  },
  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options)
  {
    var key=options.key;
    userName=app.globalData.nickname;
    if(key.length>0)
    {
        this.setData({searchCon:key});
        this.search();
    }
  },
    //点击商品进入商品详情
    showDetil: function (e) {
        var data = e.currentTarget.dataset.data;
        var goodsID = data.goodsID;
        wx.navigateTo(
            {
                url: '../../../pages/goods/goods?goodsID=' + goodsID
            });
    },
  /*加购操作*/
  addToCart: function (e) {
    var that = this;
    this.setData({ cartList: [] });
    var goodsChicked = e.currentTarget.dataset.data2;
    if (goodsChicked.g_stock == 0) wx.showToast({
      title: '抱歉！咱家没货了。。。。\n<(＿　＿)>',icon:'none',
    });//没库存了就不加购了
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
            goods.goodsStock = goodsChicked.g_stock;

            var flag = false;//设置标志是否该用户的购物车里存在该商品
            for (var i = 0; i < list.length; i++) {
              if (list[i].goodsID == goods.goodsID) {
                list[i].inCartCount++;
                goods.inCartCount = list[i].inCartCount;
                if (goods.inCartCount > goods.goodsStock) {
                  wx.showToast({
                    title: '抱歉！咱家货都在您车里了。。。\n<(＿　＿)>', icon: 'none',
                  });//没库存了就不加购了
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
            wx.showToast({
              title: "(≧∇≦)ﾉ" + goods.goodsName + "加购成功!", icon: 'none',
            })
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
            wx.showToast({
              title: "(≧∇≦)ﾉ" + goods.goodsName + "加购成功!", icon: 'none',
            })
          }
        });
    }

  },

    inContent:function(e){
        this.setData({
            searchCon: e.detail.value
        })
    },

    search: function () {
        var that = this;
        if (this.data.searchCon == '') {
            wx.showToast({
                title: '请输入搜索内容',
                icon: 'none',
            })
        }
        else{
            wx.request({
                url: host +'/web/goods/search',
                data:{
                    name:that.data.searchCon,
                },
                success(res){
                  that.setData({
                    disableOrnot: false,
                    goodsList: res.data
                  })
                  if (res.data.length == 0)
                  {
                    wx.showToast({
                      title: '抱歉没能找到相关的内容',
                      icon:'none',
                      duration:2000
                    });
                  }
                },
                fail:function()
                {
                  wx.showToast({
                    title:  "服务器走丢了!", icon: 'none',
                  })
                }
            })
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
    
  }
})
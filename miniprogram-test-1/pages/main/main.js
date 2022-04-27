// pages/main/main.js
var app = getApp()
var host = app.globalData.host;

function GoodsOnMain() {
  this.goodsID = "";
  this.g_goodsname = "";
  this.g_goodsprice = 0;
  this.g_front = "";
  this.allSales=0;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tui_img:[
        "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1562593378&di=08de082863289160dee9985123212433&src=http://img1.juimg.com/180428/330735-1P42Q22U757.jpg",
       "http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180111/a4ce8ba60d5f4e1ca4b4f002d8fc5fd1.jpeg",
        "http://img0.imgtn.bdimg.com/it/u=4081917548,1535878172&fm=26&gp=0.jpg",
        "http://img0.imgtn.bdimg.com/it/u=1474177830,985454848&fm=214&gp=0.jpg",
        "http://img3.imgtn.bdimg.com/it/u=2767203323,1251750742&fm=26&gp=0.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562838066052&di=253f734960f3185ffc3b082d62c9c29d&imgtype=0&src=http%3A%2F%2Fimg009.hc360.cn%2Fg1%2FM05%2F64%2FD3%2FwKhQL1KryOGEYGDqAAAAACBBepo701.jpg"
       ],
    topSales:null,
    goodsList:[],
    userData:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

      wx.showLoading({
        title: '加载中...',
      });
    wx.request({
      url: host+'/web/sales/top',
      method: 'get',//请求类型
      data: {//请求的参数
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        //this在请求中不能使用 需要定义一个变量 that 来代替this
        console.log(res.data)
        var resList=[];
        var list=res.data;
        var index=0;
        for(var i=0;i<10&&i<list.length;i++)
        {
          wx.request({
            url: host + '/web/goods/findByid',
            method: 'get',//请求类型
            data: {//请求的参数
              goodsID: list[i].goodsID
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {//获取成功，为页面数据赋值
              var goods=new GoodsOnMain();
              index++;
              if (list[index-1].goodsID == res.data[0].goodsID)
              {
                goods.goodsID=res.data[0].goodsID;
                goods.g_front = res.data[0].g_front;
                goods.allSales=list[index-1].allSales;
                goods.g_goodsname=res.data[0].g_goodsname;
                goods.g_goodsprice = res.data[0].g_goodsprice;
                resList.push(goods);
                that.setData({ goodsList: resList });
              }
              else return;
            },
            fail:function()
            {
              wx.showToast({
                  title: '请检查网络！',
                  icon:'none'
              });
            }
          });
        }
        wx.hideLoading();
      },
      fail:function(){
        wx.hideLoading();
          wx.showToast({
              title: '请检查网络！',
              icon:'none',
              duration:3000,
          });
      }
    })
  },
/*根据点击的今日推荐下的项跳转到商品页 */
toStore:function(e)
{
    var flag = e.currentTarget.dataset.index+1;
    app.globalData.defaultStoreShowKind=flag;
    wx.switchTab({
        url: '/pages/store/store',
    });
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
      this.onLoad();
      wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title:'首页',
      path:'/pages/main/main',
      success:function(res){
        //转发成功
      },
      fail:function(res){
        //转发失败
      }
    }
  }
})
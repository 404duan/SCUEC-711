var app = getApp();
var host = app.globalData.host;
var timerMsg; //消息显示定时器
var msgTTL = 1000; //上述定时器的计时时间
var userName; //用户名

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
    data: {
        msgUnvisable: true,
        hideALl: false,
        goodsList: [],
        cartList: []
    },
    /*页面加载时请求相关的数据*/
    onLoad: function(e) {
        var that = this;
        userName = app.globalData.nickname;
        wx.showLoading({
            title: '加载中...',
        });
        wx.request({
            url: host + '/web/collect/fgByname',
            data: {
                u_nickname: userName
            },
            success: function(res) {
                var list = [];
                if (res.data.length > 0) list = res.data[0].goodsList;
                app.globalData.collectionList = list; //更新全局变量里的收藏表
                // console.log("收藏", app.globalData.collectionList);
                that.setData({
                    goodsList: list
                });
                wx.hideLoading();
                if (list.length == 0) that.setData({
                    hideAll: true
                });
                else that.setData({
                    hideAll: false
                });
                wx.hideLoading();
            },
            fail: function() {
                wx.hideLoading();
                that.showMsg("网络连接好像出了点问题...😭", 3000);
                that.setData({
                    hideAll: true
                });
                return;
            }
        });
    },
    /*下拉刷新操作*/
    onPullDownRefresh: function(e) {
        this.onLoad();
        wx.stopPullDownRefresh();
    },
    /*删除收藏项 */
    removeItem: function(e) {
        var that = this;
        var index = e.currentTarget.dataset.index;
        var list = that.data.goodsList;
        wx.showModal({
            title: '确定删除该收藏？',
            content: '“' + list[index].g_goodsname + "”将从您的收藏里删除。",
            success: function(res) {
                if (res.confirm) {
                    wx.request({
                        url: host + '/web/collect/removeCollection',
                        data: {
                            nickname: userName,
                            goodsID: list[index].goodsID
                        },
                        header: {
                            'content-type': 'application/json' // 默认值
                        },
                        method: 'GET',
                        dataType: 'json',
                        responseType: 'text',
                        success: function(res) {
                            list.splice(index, 1);
                            // console.log("index",index);
                            that.setData({
                                goodsList: list
                            }); //更新页面显示
                            app.globalData.collectionList = list; //更新全局列表
                            if (list.length == 0) that.setData({
                                hideAll: true
                            });
                            app.globalData.collectionList = list;
                        },
                        fail: function(res) {
                            that.showMsg("删除收藏失败，请检查网络连接！");
                        }
                    });
                }
            }
        });
    },
    /*点击商品区域进入商品详情页*/
    showDetil: function(e) {
        var data = e.currentTarget.dataset.data;
        wx.navigateTo({
            url: '/pages/goods/goods?goodsID=' + data
        });
    },
    /*加购操作*/
    addToCart: function(e) {
        var that = this;
        this.setData({
            cartList: []
        });
        var goodsChicked = e.currentTarget.dataset.data;
        if (goodsChicked.g_stock == 0) that.showMsg("抱歉！咱家没货了。。。\n<(＿　＿)>", 2000); //没库存了就不加购了
        else {
            wx.getStorage({
                key: userName + '_goods',
                success: function(res) {
                    that.setData({
                        cartList: res.data
                    });
                    var list = that.data.cartList;
                    var goods = new Goods();
                    goods.goodsID = goodsChicked.goodsID;
                    goods.goodsName = goodsChicked.g_goodsname;
                    goods.goodsPrice = goodsChicked.g_goodsprice;
                    goods.goodsImage = goodsChicked.g_front;
                    goods.goodsStock = goodsChicked.g_stock;

                    var flag = false; //设置标志是否该用户的购物车里存在该商品
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].goodsID == goods.goodsID) {
                            list[i].inCartCount++;
                            goods.inCartCount = list[i].inCartCount;
                            if (goods.inCartCount > goods.goodsStock) {
                                that.showMsg("抱歉！咱家货就这么多了。。。\n<(＿　＿)>", 2000); //没库存了就不加购了
                                return;
                            }
                            flag = true;
                            break;
                        }
                    }
                    if (flag == false) {
                        goods.inCartCount = 1;
                        that.setData({
                            cartList: that.data.cartList.concat(goods)
                        });
                        list = that.data.cartList;
                    }
                    wx.setStorage({
                        key: userName + "_goods",
                        data: list
                    });
                    that.showMsg("(≧∇≦)ﾉ" + goods.goodsName + "加购成功!\n");
                },
                fail: function() //若该用户的购物车里无数据，则新建添加
                {
                    var goods = [];
                    goods.goodsID = goodsChicked.goodsID;
                    goods.goodsName = goodsChicked.g_goodsname;
                    goods.goodsPrice = goodsChicked.g_goodsprice;
                    goods.goodsImage = goodsChicked.g_front;
                    goods.goodsStock = goodsChicked.g_stock;
                    goods.inCartCount = 1;
                    wx.setStorage({
                        key: userName + "_goods",
                        data: that.data.cartList.concat(goods)
                    });
                    that.showMsg("(≧∇≦)ﾉ" + goods.goodsName + "加购成功!\n");
                }
            });
        }
    },
    /*显示消息*/
    showMsg(m, msgTTL = 1000) {
        var that = this;
        that.setData({
            msg: m
        }); //设置消息
        that.setData({
            msgUnvisable: false
        }); //消息可见
        clearTimeout(timerMsg);
        timerMsg = setTimeout(function() {
            that.setData({
                msgUnvisable: true
            }); //消息不可见
        }, msgTTL);
    }
});
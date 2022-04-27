const app = getApp();
var host = app.globalData.host;
var timerMsg; //消息显示定时器
var msgTTL = 1000; //上述定时器的默认计时时间
var userName; //用户名

function Goods() {
    this.goodsID = "";
    this.goodsName = "";
    this.goodsPrice = 0;
    this.goodsImage = "";
    this.inCartCount = 0;
    this.goodsStock = 0;
}

Page({
    data: {
        hideCart: false,
        goodList: [],
        selectedCount: 0 //选中条目总计
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
    },
    /*统计总价并更改全选框以及已勾选条目统计*/
    computeCount() {
        var that = this;
        var count = 0;
        var countSelected = 0;
        var list = that.data.goodsList;
        for (var i = 0; i < list.length; i++) {
            if (list[i].selected) {
                count = count + list[i].inCartCount * list[i].goodsPrice;
                countSelected++;
            }
        }
        that.setData({
            count: count.toFixed(2),
            selectedCount: countSelected
        });
        if (countSelected == list.length) //若全部都选上了就把全选勾上
        {
            that.setData({
                checkAllBoxColor: 'greenyellow'
            });
        } else that.setData({
            checkAllBoxColor: 'white'
        });
    },
    onLoad: function(e) {
        var that = this;
        wx.showLoading({
            title: '加载中...',
        });
        userName = wx.getStorageSync("nickname");;
        wx.getStorage({
            key: userName + '_goods',
            success: function(res) {
                that.setData({
                    goodsList: res.data
                })
                if (res.data.length == 0) that.setData({
                    hideCart: true
                });
                else that.setData({
                    hideCart: false
                });
                that.computeCount();
            },
            fail: function() {
                that.setData({
                    hideCart: true
                });
            }
        })
    },
    /*下拉刷新操作*/
    onPullDownRefresh: function(e) {
        this.onLoad();
        wx.stopPullDownRefresh();
        wx.hideLoading();
    },
    onShow: function(e) {
        this.onLoad();
        wx.hideLoading();
    },
    onReady: function(e) {
        wx.hideLoading();
    },
    /*点击图片进入商品详情页*/
    showDetil: function(e) {
        var data = e.currentTarget.dataset.data;
        wx.navigateTo({
            url: '../goods/goods?goodsID=' + data
        });
    },
    /*点击减号*/
    tapMinus: function(e) {
        var that = this;
        var index = e.currentTarget.dataset.index;
        var list = that.data.goodsList;
        if (list[index].inCartCount > 1) //商品数至少为1
        {
            list[index].inCartCount--;
            that.setData({
                goodsList: list
            });
            if (list[index].selected) that.computeCount();
            wx.setStorage({
                key: userName + '_goods',
                data: list
            });
        } else {
            that.showMsg("再减就没有喽~(*^_^*)", 1500);
        }
    },
    /*点击加号*/
    tapPlus: function(e) {
        var that = this;
        var index = e.currentTarget.dataset.index;
        var list = that.data.goodsList;
        if (list[index].inCartCount < list[index].goodsStock) //商品数不能超过库存
        {
            list[index].inCartCount++;
            if (list[index].selected) {
                that.computeCount();
            }
            that.setData({
                goodsList: list
            });
            wx.setStorage({
                key: userName + '_goods',
                data: list
            });
        } else {
            that.showMsg("库存不够我也没办法(っ °Д °;)っ", 1500);
        }
    },
    /*选择框点击*/
    itemBoxTap: function(e) {
        var that = this;
        var index = e.currentTarget.dataset.index;
        var list = that.data.goodsList;
        list[index].selected = !list[index].selected;
        that.setData({
            goodsList: list
        });
        wx.setStorage({
            key: userName + '_goods',
            data: list
        });
        that.computeCount();
    },
    /*最下方全选框点击*/
    allBoxTap: function(e) {
        var that = this;
        var color = that.data.checkAllBoxColor;
        var list = that.data.goodsList;
        if (color == "white") {
            for (var i = 0; i < list.length; i++) {
                list[i].selected = true;
            }
            that.setData({
                checkAllBoxColor: 'greenyellow'
            });
        } else {
            for (var i = 0; i < list.length; i++) {
                list[i].selected = false;
            }
            that.setData({
                checkAllBoxColor: 'white'
            });
        }
        that.setData({
            goodsList: list
        });
        wx.setStorage({
            key: userName + '_goods',
            data: list,
        });
        that.computeCount();
    },
    /*结算按钮操作*/
    gotoSettle: function(e) {
        var that = this;
        // if(that.data.selectedCount==0)
        // {
        //   that.showMsg("请勾选货物哦，亲！(～￣▽￣)～",1500);
        //   return;
        // }
        var list = that.data.goodsList;
        var sentList = [];
        for (var i = 0; i < list.length; i++) {
            var goods = new Goods();
            if (list[i].selected) {
                goods.goodsID = list[i].goodsID;
                goods.goodsName = list[i].goodsName;
                goods.goodsPrice = list[i].goodsPrice;
                goods.goodsImage = list[i].goodsImage;
                goods.inCartCount = list[i].inCartCount;
                goods.goodsStock = list[i].goodsStock;
                sentList.push(goods);
            }
        }
        console.log("send:", sentList);
        wx.setStorage({
            key: userName + 'newOrder',
            data: sentList,
        })
        wx.navigateTo({
            url: '/pages/confirmOrder/confirmOrder'
        });
    },
    /*移除当前商品*/
    removeItem: function (e) {
        var that = this;
        var index = e.currentTarget.dataset.index;
        var list = that.data.goodsList;
        wx.showModal({
            title: '确定移除？',
            content: "“" + list[index].goodsName + "”将从购物车里移除。",
            success: function (res) {
                if (res.confirm) {
                    list.splice(index, 1);
                    // console.log("index",index);
                    that.setData({
                        goodsList: list
                    });
                    wx.setStorage({
                        key: userName + '_goods',
                        data: list,
                    });
                    that.computeCount();
                    if (list.length == 0) that.setData({
                        hideCart: true
                    });
                }
            }
        })
    }
})
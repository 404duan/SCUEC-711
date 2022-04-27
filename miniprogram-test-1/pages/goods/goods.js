var app = getApp();
var host = app.globalData.host;
var isStar = false; //是否收藏
var fatherEvent; //父页面传递过来的数据
var timerMsg; //消息显示定时器
var msgTTL = 1000; //上述定时器的默认计时时间
var userName; //用户名

/*判断是否在收藏列表里 */
function isInCollectionList(goodsID) {
    var list = app.globalData.collectionList;
    for (var i = 0; i < list.length; i++) {
        if (goodsID == list[i].goodsID) return true;
    }
    return false;
}

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
        //商品图片地址
        imgUrls: [],
        //图片轮播设置
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        //商品文字描述
        goodsInfo: "NULL",
        goodsName: "NULL",
        goodsPrice: 0,
        goodsStock: 0,
        allSales: 0,
        //界面图标按钮
        cart_img: "/image/cart.png",
        service_img: "/image/service.png",
        star_img: "/image/star.png",
        showDialog: false,
        cartList: [],
        goods: []
    },
    //页面加载操作,根据传入的id查询商品具体的值
    onLoad: function(e) {
        fatherEvent = e;
        wx.showLoading({
            title: '正在加载...',
        });
        //部分变量的初始化
        userName = app.globalData.nickname; //获取用户名
        isStar = isInCollectionList(e.goodsID); //判断收藏
        if (isStar == false) this.setData({
            bt_star_style: "background-color:#f0f0ff;"
        })
        else this.setData({
            bt_star_style: "background-color:pink;"
        });

        var gID = e.goodsID;
        var that = this;
        wx.request({
            url: host + '/web/goods/findByid',
            method: 'get', //请求类型
            data: { //请求的参数
                goodsID: gID
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) { //获取成功，为页面数据赋值
                var goods = res.data[0];
                that.setData({
                    goods: goods
                });
                var gName = goods.g_goodsname;
                var gPrice = goods.g_goodsprice;
                var gStock = goods.g_stock;
                var gInfo = goods.g_describe;
                var gImgUrls = goods.g_image + " ";
                var maxPicNum = 10;
                var buf = "";
                that.setData({
                    imgUrls: []
                });
                if (gStock == 0) that.setData({
                    bt_cart_style: "background-color:#999;"
                });
                for (var i = 0, j = 0; i < gImgUrls.length; i++) {
                    if (gImgUrls[i] == '|' || i == gImgUrls.length - 1) //通过|切分图片地址
                    {
                        that.setData({
                            imgUrls: that.data.imgUrls.concat(buf)
                        });
                        buf = "";
                    } else buf = buf + gImgUrls[i];
                }
                that.setData({
                    goodsStock: gStock,
                    goodsPrice: gPrice,
                    goodsName: gName,
                    goodsInfo: gInfo
                });
                //获取销量
                wx.request({
                    url: host + '/web/sales/findByid',
                    method: 'get',
                    data: {
                        id: gID
                    },
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success(res) {
                        that.setData({
                            allSales: res.data[0].allSales
                        })
                    },
                    fail: function() {
                        wx.showToast({
                            title: "服务器走丢了!",
                            icon: 'none',
                        })
                    }
                });
                wx.hideLoading();
            },
            fail: function() {
                wx.hideLoading();
                that.showMsg("商品不知道被谁吃了，稍后再刷新试试吧？(＃°Д°)", 3000);
            }
        });
    },
    onReady: function(e) {},
    /*下拉刷新事件*/
    onPullDownRefresh: function() {
        wx.showLoading({
            title: '正在刷新...',
        });
        this.onLoad(fatherEvent);
        wx.stopPullDownRefresh();
    },
    //定时切换图片
    intervalChange: function(e) {
        this.setData({
            interval: e.detail.value
        })
    },
    //滑动切图
    durationChange: function(e) {
        this.setData({
            duration: e.detail.value
        })
    },
    //图片预览
    previewImg: function(e) {
        var src = e.currentTarget.src; //当前图片
        wx.previewImage({
            current: src, // 当前显示图片的http链接
            urls: this.data.imgUrls // 需要预览的图片http链接列表
        })
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
    //点击收藏按钮操作
    clicked_bt_star: function(e) {
        var that = this;
        if (isStar == false) //未收藏则添加收藏
        {
            that.setData({
                bt_star_style: "background-color:pink;"
            });
            wx.request({
                url: host + '/web/collect/addCollection',
                data: {
                    nickname: userName,
                    goodsID: fatherEvent.goodsID
                },
                header: {
                    'content-type': 'application/json' // 默认值
                },
                method: 'GET',
                dataType: 'json',
                responseType: 'text',
                success: function(res) {
                    that.showMsg("已添加收藏！");
                    isStar = true;
                    var list = app.globalData.collectionList; //获取收藏列表
                    var goods = that.data.goods;
                    list.push(goods);
                    app.globalData.collectionList = list; //更新本地收藏表
                },
                fail: function(res) {
                    that.showMsg("添加收藏失败");
                    that.setData({
                        bt_star_style: "background-color:#f0f0ff;"
                    });
                }
            });
        } else //收藏则删除收藏
        {
            this.setData({
                bt_star_style: "background-color:#f0f0ff;"
            });
            wx.request({
                url: host + '/web/collect/removeCollection',
                data: {
                    nickname: userName,
                    goodsID: fatherEvent.goodsID
                },
                header: {
                    'content-type': 'application/json' // 默认值
                },
                method: 'GET',
                dataType: 'json',
                responseType: 'text',
                success: function(res) {
                    var list = app.globalData.collectionList; //获取收藏列表
                    var gid = that.data.goods.goodsID;
                    for (var i = 0; i < list.length; i++) {
                        if (gid == list[i].goodsID) {
                            list.splice(i, 1);
                            break;
                        }
                    }
                    app.globalData.collectionList = list;
                    // console.log("取消后", app.globalData.collectionList);
                    that.showMsg("已取消收藏！");
                    that.setData({
                        bt_star_style: "background-color:#f0f0ff;"
                    })
                    isStar = false;
                },
                fail: function(res) {
                    that.showMsg("取消收藏失败");
                    that.setData({
                        bt_star_style: "background-color:pink;"
                    });
                }
            });
        }
    },
    //点击加购按钮操作,使用本地存储
    clicked_bt_cart: function(e) {
        var that = this;
        this.setData({
            cartList: []
        });
        if (that.data.goodsStock == 0) that.showMsg("抱歉！咱家没货了。。。\n<(＿　＿)>", 2000); //没库存了就不加购了
        else {
            wx.getStorage({
                key: userName + '_goods',
                success: function(res) {
                    that.setData({
                        cartList: res.data
                    });
                    var list = that.data.cartList;
                    var goods = new Goods();
                    goods.goodsID = fatherEvent.goodsID;
                    goods.goodsName = that.data.goodsName;
                    goods.goodsPrice = that.data.goodsPrice;
                    goods.goodsImage = that.data.imgUrls[0];
                    goods.goodsStock = that.data.goodsStock;

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
                    var goods = new Goods();
                    goods.goodsID = fatherEvent.goodsID;
                    goods.goodsName = that.data.goodsName;
                    goods.goodsPrice = that.data.goodsPrice;
                    goods.goodsImage = that.data.imgUrls[0];
                    goods.inCartCount = 1;
                    goods.goodsStock = that.data.goodsStock;
                    wx.setStorage({
                        key: userName + "_goods",
                        data: that.data.cartList.concat(goods)
                    });
                    that.showMsg("(≧∇≦)ﾉ" + goods.goodsName + "加购成功!\n");
                }
            });
        }
    }
})
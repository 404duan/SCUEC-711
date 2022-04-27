const app = getApp();
var host = app.globalData.host;

Page({
    data: {
        // 顶部菜单切换
        navbar: ['全部', "待收货", "已完成"],
        status: ['已发货', '已完成'],
        // 默认选中菜单
        currentTab: 0,
        index: 0,
        orderID: '',

        orders_List: [], //从后端接收的订单内容
        goodsList: [],
        g_image: "",
        g_goodsname: "",
        goodsnum: 0,
        goodsID: "",
        orderIDs: [],
        orderIDss: [],
        myOrderList: [],
    },
    onLoad: function(options) {

        var that = this;
        // 获取用户昵称
        this.setData({
            nickname: app.globalData.nickname
        })
        //1.查询这个用户昵称下的信息,需要uid：用 nickname 从user表 查uid
        wx.request({
            url: host + '/web/user/selectByname',
            method: "get",
            data: {
                name: that.data.nickname
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                console.log(res.data),
                    that.setData({
                        u_id: res.data.u_id
                    })
                wx.request({
                    url: host + '/web/myorder/findByuid',
                    method: "get",
                    data: {
                        u_id: that.data.u_id
                    },
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success(res) {
                        console.log(res.data);
                        that.setData({
                            orders_List: res.data
                        })
                        console.log(that.data.orders_List)
                    },
                    fail: function () {
                        wx.showToast({
                            title: "服务器走丢了!", icon: 'none',
                        })
                    }
                })

                // //2.请用 uid 从 orderform 表，返回：订单号、商品id、商品数量列表
                // wx.request({
                //     url: host + '/web/orderform/findOrdNum',
                //     method: "get",
                //     data: {
                //         u_id: that.data.u_id
                //     },
                //     header: {
                //         'content-type': 'application/json' // 默认值
                //     },
                //     success(res) {
                //         console.log("orders_List", res.data),
                //             that.setData({
                //                 orders_List: res.data
                //             });
                //         console.log("orders_List_0", that.data.orders_List[0])

                //         //得到一个含有重复orderID值的数组
                //         var orders_List = that.data.orders_List;
                //         for (var index in orders_List[0].order) {
                //             // var orderIDParam = "orderIDs[" + index + "].orderID"
                //             var orderIDParam = "orderIDs[" + index + "]"
                //             that.setData({
                //                 [orderIDParam]: orders_List[0].order[index].orderID,
                //             })
                //         }

                //         //删除数组中重复元素
                //         var orderIDs = that.data.orderIDs;
                //         var orderIDss = that.data.orderIDss;
                //         var set7 = new Set([...orderIDs])
                //         console.log(set7);
                //         //将Set集合中的值取出赋值给orderIDss
                //         var i = 0;
                //         for (var index of set7) {
                //             var orderIDParam = "orderIDss[" + i + "]";
                //             i++;
                //             that.setData({
                //                 [orderIDParam]: index,
                //             })
                //         }
                //         console.log(orderIDss)
                //         // var orderIDss = that.data.orderIDs;
                //         // var orderIDs = that.data.orderIDs;
                //         // for (var i = 0; i < orderIDss.length; i++) {
                //         //     if (orderIDss[i] in orderIDs[i+1]) {
                //         //         orderIDss.splice(i, 1)
                //         //     }
                //         // }
                //         // console.log(orderIDss)

                //     }
                // })
                // //3.用 uid 从 goods 表，查 goods信息
                // wx.request({
                //     url: host + '/web/orderform/findGoods',
                //     method: "get",
                //     data: {
                //         u_id: that.data.u_id
                //     },
                //     header: {
                //         'content-type': 'application/json' // 默认值
                //     },
                //     success(res) {
                //         console.log("goodsList", res.data),
                //             that.setData({
                //                 goodsList: res.data
                //             })

                //     } //end 4.success
                // }) //第四个request
            }, //end 1.success
            fail: function () {
                wx.showToast({
                    title: "服务器走丢了!", icon: 'none',
                })
            }
        }) //第一个

        // wx.request({
        //     url: host + '/web/orderform/findByid',
        //     method: "get",
        //     data: {
        //         orderID: that.data.u_id
        //     },
        //     header: {
        //         'content-type': 'application/json' // 默认值
        //     },

        // })
    },

    //确认收货,跳回本页面重新request刷新本页面内容
    personOrder: function(e) {
        var that = this;
        wx.showModal({
            title: '提示',
            content: '确认收货？',
            success: function(res) {
                if (res.confirm) {
                    //将该订单状态 从 待收货 转变成 已完成
                    wx.request({
                        url: host + '/web/orderform/upst',
                        method: "get",
                        header: {
                            'content-type': 'application/json' // 默认值
                        },
                        data: {
                            orderID: e.target.id
                        },
                        success: function(res) {
                            wx.showToast({
                                title: '确认成功',

                            })

                            wx.redirectTo({
                                url: '../order3/order3',
                            })
                        }
                    })

                } else {
                    //取消无操作
                }
            },
            fail: function () {
                wx.showToast({
                    title: "服务器走丢了!", icon: 'none',
                })
            }
        })
    },

    //顶部tab切换
    navbarTap: function(e) {
        this.setData({
            currentTab: e.currentTarget.dataset.idx
        })
    },

    onShow: function() {
        this.onLoad;
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        this.onLoad();
        wx.stopPullDownRefresh();
    },
})
const app = getApp();
var host = app.globalData.host;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: '',   //联系人姓名
        tel: '',        //手机号
        address: '',    //地区
        gate: '',       //原本用来做门牌号，后改为详细地址

        region: [], //城市选择地址的数据区
        detailed: '请选择',
    },

    handleName: function (e) {
        this.setData({
            username: e.detail.value
        })
    },

    handleTel: function (e) {
        this.setData({
            tel: e.detail.value
        })
    },

    //选择城市的触发事件
    bindRegionChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            //拼的字符串传后台
            address: e.detail.value[0] + ' ' + e.detail.value[1] + ' ' + e.detail.value[2] + ' ',
            //选择器的值更改
            detailed: e.detail.value[0] + ' ' + e.detail.value[1] + ' ' + e.detail.value[2],
            //下拉框选中的值
            region: e.detail.value
        })
    },

    handleGate: function (e) {
        this.setData({
            gate: e.detail.value
        })
    },

    submitButton: function () {
        var that = this;
        if (this.data.name == '') {
            wx.showToast({
                title: '姓名不能为空',
                duration: 1000
            })
            return
        } else if (this.data.tel.length != 11) {
            wx.showToast({
                title: '手机号格式错误',
                image: '/image/tanshou.png',
                duration: 1000
            })
            return
        } else {
            wx.request({
                url: host + '/web/user/reAddr',
                method: 'get',
                header: {
                    'Content-Type': 'application/json'
                },
                data: {
                    'addr': that.data.address + that.data.gate,
                    'tel': that.data.tel,
                    'username': that.data.username,
                    'nickname': wx.getStorageSync("nickname"),
                }, //数据库地址更新完毕

                success(res) {
                    if (res.data == true) {
                        wx.showToast({
                            title: '地址更改成功！',
                            success() {
                                setTimeout(function () {
                                    wx.navigateBack({
                                        delta: 1,
                                    });
                                }, 1000)
                            }
                        })
                    } else {
                        wx.showToast({
                            title: '地址更改失败！',
                            icon: 'none',
                            success() {
                                setTimeout(function () {
                                    wx.navigateBack({
                                        delta: 1,
                                    });
                                }, 1000)
                            }
                        })
                    }
                },
                fail: function () {
                    wx.showToast({
                        title: "请检查网络!",
                        icon: 'none',
                    })
                }

            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.request({
            url: host + '/web/user/selectByname',
            method: 'get',
            header: {
                'Content-Type': 'application/json'
            },
            data: {
                name: wx.getStorageSync("nickname"),
            },
            success(res) {
                console.log(res.data)
                that.setData({
                    username: res.data.u_username,
                    tel: res.data.u_tell,
                    address: res.data.u_address,
                })
            },
            fail: function () {
                wx.showToast({
                    title: "服务器走丢了!",
                    icon: 'none',
                })
            }
        })
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
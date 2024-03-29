// pages/profile/profile.js
const app = getApp();
var host = app.globalData.host;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        nickname: '',
        userImg: '',//本来想加上传的功能，后删掉了此功能
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
    },

    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // this.setData({
        //     userInfo: app.globalData.userInfo,
        //     // hasUserInfo: true
        // })
        
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }

        var that = this;
        this.setData({
            nickname: wx.getStorageSync("nickname")
        })
        
        wx.request({
            url: host + '/web/user/selectByname',
            method: 'get',
            data: {
                name: wx.getStorageSync("nickname")
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                console.log(res.data)
                // that.setData({
                //     userImg: res.data.u_photo,
                // })
            },
            fail: function () {
                wx.showToast({
                    title: "服务器走丢了!", icon: 'none',
                })
            }
        })
    },

    // getUserInfo: function (e) {
    //     console.log(e)
    //     app.globalData.userInfo = e.detail.userInfo
    //     this.setData({
    //         userInfo: e.detail.userInfo,
    //         hasUserInfo: true
    //     })
    // },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

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
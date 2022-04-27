// pages/userSetting/userSetting.js
const app = getApp();
var host = app.globalData.host;
var userName; //用户名
var chickCount=0;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userImg: '',
        nickname: '',
        u_sex: '',
        userInfo: {},
    },

    upSex: function(e) {
        this.setData({
            u_sex: e.detail.value
        })
    },
  upShopLogo: function ()
  {
    chickCount++;
    if(chickCount>=5)
    wx.showToast({
      title: '彩蛋',
      icon:'none',
      image:"/image/huaji.png"
    });
  },
    // // 点击上传图片
    // upShopLogo: function() {
    //     var that = this;
    //     wx.showActionSheet({
    //         itemList: ['从相册中选择', '拍照'],
    //         itemColor: "#f7982a",
    //         success: function(res) {
    //             if (!res.cancel) {
    //                 if (res.tapIndex == 0) {
    //                     that.chooseWxImageShop('album'); //从相册中选择
    //                 } else if (res.tapIndex == 1) {
    //                     that.chooseWxImageShop('camera'); //手机拍照
    //                 }
    //             }
    //         }
    //     })
    // },

    // //选择图片
    // chooseWxImageShop: function(type) {
    //     var that = this;
    //     wx.chooseImage({
    //         sizeType: ['original', 'compressed'],
    //         sourceType: [type],
    //         success: function(res) {
    //             var tempFilePaths = res.tempFilePaths
    //             wx.saveFile({
    //                 tempFilePath: '../../../image',
    //                 success: function(res) {
    //                     var savedFilePath = res.savedFilePath
    //                     console.log(savedFilePath)
    //                 }
    //             })
    //             // that.data.userimg = res.tempFilePaths[0],
    //             // that.upload_file(urldate.upimg + 'shop/shopIcon', res.tempFilePaths[0])
    //             // userimg = res.tempFilePaths[0];
    //             // that.setData({
    //             //   userimg: userimg
    //             // })
    //         }
    //     })
    // },

    // //上传图片到服务器
    // upload_file: function (url, filePath) {
    //   var that = this;
    //   var signature = signa.signaturetik('token=' + token, 'userAccessToken=' + userAccessToken, 'studentAccessToken=' + studentAccessToken);
    //   wx.uploadFile({
    //     url: urldate.upimg,//后台处理接口
    //     filePath: filePath,
    //     name: 'file',
    //     header: {
    //       'content-type': 'multipart/form-data'
    //     }, // 设置请求的 header
    //     formData: {//需要的参数
    //       'token': token,
    //       'signature': signature,
    //       'userAccessToken': userAccessToken,
    //       'studentAccessToken': studentAccessToken
    //     }, // HTTP 请求中其他额外的 form data
    //     success: function (res) {
    //       var data = JSON.parse(res.data);
    //       that.setData({
    //         userimg: data.path,
    //       });
    //       that.showMessage('上传成功');
    //     },
    //     fail: function (res) {
    //     }
    //   })
    // },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        userName = app.globalData.nickname;
        var that = this;
        chickCount = 0;
        this.setData({
            nickname: wx.getStorageSync("nickname"),
            userInfo: app.globalData.userInfo,
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
                //   that.setData({
                //       userImg: res.data.u_photo,
                //   })
            },
            fail: function () {
                wx.showToast({
                    title: "请检查网络!", icon: 'none', duration:3000,
                })
            }
        })
    },

    /*退出按钮响应函数*/
    logout: function() {
        wx.showModal({
            title: '确认退出？',
            content: '退出后将您必须需要重新登录。',
            success: function(res) {
                if (res.confirm) {
                    wx.removeStorage({
                        key: 'need_login',
                        success: function(res) {
                            wx.removeStorage({
                                key: 'nickname',
                                success: function(res) {
                                    wx.removeStorage({
                                        key: 'data_expiration',
                                        success: function(res) {
                                            wx.showModal({
                                                title: '是否要清除购物车缓存？',
                                                content: '这样更安全，但购物车缓存清除后将不能恢复。',
                                                success: function(res) {
                                                    if (res.confirm) {
                                                        wx.removeStorage({
                                                            key: userName + '_goods',
                                                            success: function(res) {},
                                                        });
                                                        wx.removeStorage({
                                                            key: userName + 'newOrder',
                                                            success: function(res) {},
                                                        })
                                                    }
                                                    wx.reLaunch({
                                                        url: '/pages/login/login',
                                                    });
                                                }
                                            });
                                        },
                                    });
                                },
                            });
                        },
                    });
                } else if (res.cancel) {
                    return;
                }
            }
        })
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

    },

    modifyAddress: function() {

        wx.navigateTo({ 
            url:   '../address/address' 
        });

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
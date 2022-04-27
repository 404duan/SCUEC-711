// test/test.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        unfold:null,
        testArray:["23","3","6"],
    },

    unfold() {
        var unfold = this.data.unfold
        if (unfold === null) { //默认为收缩
            unfold = 1
        }
        if (unfold == 0) {   //点击后改变展开样式
            unfold = 1
        } else {
            unfold = 0
        }
        this.setData({  //赋值
            unfold: unfold
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        for(var i in ar){
            console.log(i)
        }
        console.log(this.data.testArray.length)
        // setTimeout(function () {
        //     wx.reLaunch({
        //         url: '../pages/main/main'})
        // },3000)
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
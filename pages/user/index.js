// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function () {

    let userInfo = wx.getStorageSync("userInfo");
    this.setData({
      userInfo
    });

  },
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/index',
    });

  }
})
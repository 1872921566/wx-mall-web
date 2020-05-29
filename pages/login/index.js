// pages/login/index.js
Page({

  handleGetUserInfo(e) {
    let { userInfo } = e.detail;
    // console.log(userInfo);
    wx.setStorageSync("userInfo", userInfo);
    wx.navigateBack({
      delta: 1
    });

  }
})
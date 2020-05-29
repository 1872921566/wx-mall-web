
import { login } from "../../utils/asyncWx";
import { request } from "../../request/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  async handleGetUserInfo(e) {
    try {
      let { iv, encryptedData, rawData, signature } = e.detail;

      let { code } = await login();

      let requestParam = { iv, encryptedData, rawData, signature, code };
      let result = await request({ url: "/users/wxlogin", data: requestParam, method: "post" });
      // let { token } = result;
      // wx.setStorageSync("token", token);
      // wx.navigateBack({
      //   delta: 1
      // });
    } catch (error) {
      console.log(error);
    }

  }

})
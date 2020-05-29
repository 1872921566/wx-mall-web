
import { request } from "../../request/request";
import { requestPayment, showToast } from "../../utils/asyncWx";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [],
    cart: {},
    totalPrice: 0,
    totalNum: 0
  },

  onShow: function () {
    //获取缓存数据 放入data
    const address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart") || [];
    cart = cart.filter(v => v.checked);

    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }
    });

    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
    wx.setStorageSync("cart", cart);
  },

  async handleOrderPay() {
    try {
      let token = wx.getStorageSync("token");
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index'
        });
        return;
      }
      console.log("存在token");
      //存在token 创建订单编号
      let header = { Authorization: token };
      let { totalPrice, cart } = this.data;
      let address = this.data.address.detail;
      let goods = [];
      cart.forEach(v => goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }));
      //   const queryParam = { totalPrice, address, goods };

      //   const {order_number} = await request({ url="/my/orders/create", data: queryParam, method: "post", header: header });
      //   const {pay} = await request({ url="/my/orders/req_unifiedorder", method="post", header, data: { order_number } });
      //   await requestPayment(pay);

      //   const res = await request({ url="/my/orders/chkOrder", method="post", header, data: { order_number } });
      //   console.log(res);
      //   await showToast("支付成功");

      //   let newCart = wx.getStorageSync("cart");
      //   newCart = newCart.filter(v => !v.checked);
      //   wx.setStorageSync("cart", newCart);

      //   wx.navigateTo({
      //     url: 'pages/order/index'
      //   });

    } catch (error) {
      console.log(error);
      await showToast("支付失败");
    }


  }

})
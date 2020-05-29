import { request } from "../../request/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { goods_id } = options;
    this.getGoodsDetail(goods_id);
  },

  getGoodsDetail(goods_id) {
    request({ url: '/goods/detail', data: { goods_id: goods_id } })
      .then(result => {
        this.setData({
          goodsObj: result.data.message
        })
      })
  },
  getBigImage(e) {
    let { url } = e.currentTarget.dataset;
    wx.previewImage({
      current: url,
      urls: this.data.goodsObj.pics.map(v => v.pics_mid),
    });

  },
  handleAddToCart() {
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(v => v.goods_id === this.data.goodsObj.goods_id)
    if (index === -1) {
      // 不存在 添加
      this.data.goodsObj.num = 1;
      this.data.goodsObj.checked = true;
      cart.push(this.data.goodsObj);
    } else {
      cart[index].num++;
      // 存在 数量加一
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '添加成功',
      icon: 'success',

      mask: true,
    });

  }
})
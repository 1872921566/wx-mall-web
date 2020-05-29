import { getSetting, openSetting, chooseAddress, showModel, showToast } from "../../utils/asyncWx.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [],
    cart: {},
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  onShow: function () {
    //获取缓存数据 放入data
    let address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart") || [];
    // let allChecked = cart.length ? cart.every(v => v.checked) : false;
    let totalPrice = 0;
    let totalNum = 0;
    let allChecked = true;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    });
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      address,
      cart,
      allChecked,
      totalPrice,
      totalNum
    })


  },

  async handleChooseAdress() {
    try {
      const res1 = await getSetting();
      let scope_adress = res1.authSetting["scope.address"];
      if (scope_adress === false) {
        const res3 = await openSetting();
      }
      const address = await chooseAddress();

      address.detail = address.provinceName + address.cityName + address.countyName + address.detailInfo
      //存入缓存
      wx.setStorageSync("address", address);


    } catch (error) {
      console.log(error)
    }

    // wx.getSetting({
    //   success: (result) => {
    //     let scope_adress = result.authSetting["scope.address"];
    //     if (scope_adress === undefined || scope_adress === true) {
    //       wx.chooseAddress({
    //         success: (res) => {
    //           console.log(res);
    //         }
    //       });
    //     } else {
    //       wx.openSetting({
    //         success: (e) => {
    //           wx.chooseAddress({
    //             success: (r) => {
    //               console.log(r);
    //             }
    //           });
    //         }
    //       });

    //     }
    //   }
    // });
  },

  handleItemChange(e) {
    let goods_id = e.currentTarget.dataset.id;
    let cart = this.data.cart
    let index = cart.findIndex(v => v.goods_id === goods_id)
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
  },
  // 设置数组 并修改全选、总价格、总数量等
  setCart(cart) {
    let totalPrice = 0;
    let totalNum = 0;
    let allChecked = true;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    });
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync("cart", cart);

  },
  handleItemAllChecked() {
    let { cart, allChecked } = this.data;
    allChecked = !allChecked;
    cart.forEach(v => v.checked = allChecked);
    this.setData({
      cart,
      allChecked
    });
    this.setCart(cart);

  },

  async handleNumedit(e) {
    let { id, operation } = e.currentTarget.dataset;
    let { cart } = this.data;
    let index = cart.findIndex(v => v.goods_id === id);
    cart[index].num += operation;
    if (cart[index].num === 0 && operation === -1) {
      // wx.showModal({
      //   title: '提示',
      //   content: '是否要删除该商品',
      //   showCancel: true,
      //   cancelText: '取消',
      //   cancelColor: '#000000',
      //   confirmText: '确定',
      //   confirmColor: '#3CC51F',
      //   success: (result) => {
      //     if (result.confirm) {
      //       cart.splice(index, 1);
      //       this.setCart(cart);
      //     }
      //   },
      //   fail: () => {
      //     this.setCart(cart);
      //   },
      // });
      let result = await showModel("是否要删除该商品")
      if (result.confirm) {
        cart.splice(index, 1);
        this.setCart(cart);
      }
    }
    if (cart[index].num === 0) {
      cart[index].num = 1;
      this.setCart(cart);
    }

    this.setData({
      cart
    });
    this.setCart(cart);

  },
  async handlePay() {
    let { address, totalNum } = this.data;

    if (!address) {
      await showToast("您还没有选择收货地址");
      return;
    }
    if (totalNum == 0) {
      await showToast("您还没有选购商品");
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    });
  }





})
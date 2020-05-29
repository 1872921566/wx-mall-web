// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "待发货",
        isActive: false
      },
      {
        id: 2,
        value: "退款/退货",
        isActive: false
      }
    ]
  },
  handleSelect(e) {
    const { index } = e.detail.index;

    let tabs = this.data.tabs;

    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    // for (let index = 0; index < tabs.length; index++) {
    //   const element = tabs[index];
    //   console.log(element.id)
    //   console.log(index1)
    //   if (element.id === index1) {
    //     element.isActive = true;
    //   } else {
    //     element.isActive = false;
    //   }
    // }
    this.setData({
      tabs
    })

  }


})
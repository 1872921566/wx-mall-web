import { request } from "../../request/request";
// pages/index/index.js
Page({
  data: {
    //轮播图数据
    swiperList: [],
    //导航栏数据
    cateList: [],
    //楼层数据
    floorList: []
  },
  onLoad: function (options) {
    //发送异步请求获取轮播图数据 方法1
    // var reqTask = wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   },
    //   fail: () => {
    //     console.log("发送异步请求获取轮播图数据获取失败");
    //   }
    // });
    //发送异步请求获取轮播图数据 方法2
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();

  },
  getSwiperList() {
    request({ url: '/home/swiperdata' })
      .then(result => {
        this.setData({
          swiperList: result.data.message
        })
      })
  },
  getCateList() {
    request({ url: '/home/catitems' })
      .then(result => {
        this.setData({
          cateList: result.data.message
        })
      })
  },
  getFloorList() {
    request({ url: '/home/floordata' })
      .then(result => {
        this.setData({
          floorList: result.data.message
        })
      })
  }


});
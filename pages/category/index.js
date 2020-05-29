import { request } from "../../request/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lefeMenuList: [],
    rightContent: [],

    selectIndex: 0,
    scrollTop: 0
  },
  catesList: [],



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var Cates = wx.getStorageSync("cates");
    // 判断本地是否有值
    if (!Cates) {

      this.getContent();
    } else {
      // 有数据判断是否过期
      if (Date.now() - Cates.time > 1000 * 60 * 5) {

        this.getContent();
      } else {
        // 有数据且没过期


        this.catesList = Cates.data
        let lefeMenuList = this.catesList.map(v => v.cat_name);
        let rightContent = this.catesList[0].children;
        this.setData({
          lefeMenuList,
          rightContent

        })
      }
    }

  },


  getContent() {
    request({ url: '/categories' })
      .then(result => {
        this.catesList = result.data.message;
        //数据存入本地
        wx.setStorageSync("cates", { time: Date.now(), data: this.catesList });
        //构造lefeMenuList数据
        let lefeMenuList = result.data.message.map(v => v.cat_name);

        let rightContent = result.data.message[0].children;
        this.setData({
          lefeMenuList,
          rightContent

        })
      })
  },

  //点击事件
  getContentByIndex(e) {

    var that = this;
    var index = e.currentTarget.dataset.index

    let content = this.catesList[index].children;

    this.setData({
      selectIndex: index,
      rightContent: content,
      scrollTop: 0

    })



  }
})
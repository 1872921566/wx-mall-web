import { request } from "../../request/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销售",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList: [],
    pageData: {
      pagenum: 0,
      pagesize: 10,
      total: 0
    }
  },
  queryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let { cid } = options;
    this.queryParams.cid = cid;
    this.getGoodsList();
  },

  //发送请求获取数据
  getGoodsList() {
    request({ url: '/goods/search', data: this.queryParams })
      .then(result => {
        this.setData({
          //拼接数组
          goodsList: [...this.data.goodsList, ...result.data.message.goods],
          pageData: {
            pagenum: result.data.message.pagenum,
            pagesize: result.data.message.goods.length,
            total: result.data.message.total
          }
        })
        wx.stopPullDownRefresh();

      })
  },

  //选中处理
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

  },
  onReachBottom: function () {
    this.findNextPageData();
  },
  //下拉触底查询下一页
  // 1.查看是否有下一页数据 当前页数 总页数=总数/页面数量
  // 2. 没有下一页弹出提示框 
  // 3. 有下一页则将数据拼接到数组中
  findNextPageData() {
    let totalPage = Math.ceil(this.data.pageData.total / this.queryParams.pagesize);
    if (this.data.pageData.pagenum >= totalPage) {
      wx.showToast({
        title: '我是有底线的哟'
      });

    } else {
      console.log("有下一页")
      this.queryParams.pagenum++;
      this.getGoodsList();
    }

  },

  onPullDownRefresh: function () {
    this.setData({
      goodsList: []
    });
    this.queryParams.pagenum = 1;
    this.getGoodsList();
  }

})
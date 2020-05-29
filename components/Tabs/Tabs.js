// components/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handle(e) {
      //获取索引
      const index = e.currentTarget.dataset
      //调用父级方法 传值

      this.triggerEvent("changeItemSelect", { index })
    }
  }
})

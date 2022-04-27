// components/MyTitle.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
      searchCon:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
      inContent:function(e){
        this.setData({searchCon:e.detail.value});
      },
      search:function(e)
      {
        var keyWords=this.data.searchCon;
        if(keyWords.length==0)
        {
          wx.showToast({
            title: '请输入内容',
            icon:'none'
          })
        }
        else
        {
           wx.navigateTo({
             url: '/components/MyTitle/search/search?key='+keyWords,
           })
        }
      }
  }
})

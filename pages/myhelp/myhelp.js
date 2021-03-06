// pages/myhelp/myhelp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["我的发布", "我的接单",],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    unusedMenus: ['全部', '待求助', '进行中', '已完成', '已取消'],
    unusedIndex: 0,
    unusedSliderOffset: 0,
    unusedSliderLeft: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  unusedTabClick(e) {
    this.setData({
      unusedSliderOffset: e.currentTarget.offsetLeft,
      unusedIndex: e.currentTarget.id
    });
  }
})
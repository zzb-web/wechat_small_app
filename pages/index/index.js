// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    ],
    grids: [
      "../../images/express.png",
      "../../images/help.png",
      "../../images/unuse.png",
      "../../images/wall.png"
    ],
    onekeys:[
      "../../images/1-01_11.png",
      "../../images/1-01_14.png",
      "../../images/1-01_15.png",
      "../../images/1-01_16.png"
    ]
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
  showPopup() {
    let popupComponent = this.selectComponent('.J_Popup');
    popupComponent && popupComponent.show();
  },
  hidePopup() {
    let popupComponent = this.selectComponent('.J_Popup');
    popupComponent && popupComponent.hide();
  },
  toDetail: function (event) {
    let index = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: `../navbars/navbars?activeIndex=${index}`,
    })
  },
  addHnadle(event){
    let index = Number(event.currentTarget.dataset.idx);
    let handles = ['addexpress','addhelp','addunused','addwall'];
    wx.navigateTo({
      url: `../${handles[index]}/${handles[index]}`,
    })
  }
})
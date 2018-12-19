// pages/expressdetail/expressdetail.js
var common = require('../../common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id : '',
    expressMsg : null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id : options.id
    })
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
    let {id} = this.data;
    let that = this;
    wx.request({
      url: `http://45.40.251.242:8090/api/expresses/${id}`,
      header: {
        "Session-Token": getApp().globalData.token
      },
      success: function (resp) {
        if (resp.data.success) {
          let expressMsg = resp.data.result.item;
          let {status} = expressMsg;
          let expressStatus = '';
          if(status == 1){
            expressStatus = '未接单'
          }else if(status == 2){
            expressStatus = '已接单'
          }
          expressMsg.endTime = common.getDate(expressMsg.deliveryEnd);
          expressMsg.expressStatus = expressStatus;
          that.setData({
            expressMsg
          })
        } else {

        }
      }
    })
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

  }
})
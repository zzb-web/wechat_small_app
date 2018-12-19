// pages/personalinfo/personalinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
    userName: '',
    wechat: '',
    phoneNumber: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //获取用户信息
    let that = this;
    wx.request({
      url: 'http://45.40.251.242:8090/api/user/info',
      header: {
        "Session-Token": getApp().globalData.token
      },
      success: function (resp) {
        let {nickname,phone,photo,realName,schoolCard,wechatName} = resp.data.result.item;
        that.setData({
          nickName: nickname,
          userName: realName,
          wechat: wechatName,
          phoneNumber: phone
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  nickNameChange(e) {
    const {
      value
    } = e.detail;
    this.setData({
      nickName: value
    })
  },
  userNameChange(e) {
    const {
      value
    } = e.detail;
    this.setData({
      userName: value
    })
  },
  wechatChange(e) {
    const {
      value
    } = e.detail;
    this.setData({
      wechat: value
    })
  },
  phoneNumberChange(e) {
    const {
      value
    } = e.detail;
    this.setData({
      phoneNumber: value
    })
  },
  sureOk() {
    const {
      nickName,
      userName,
      wechat,
      phoneNumber
    } = this.data;
    console.log(nickName, userName, wechat, phoneNumber)
    let postData = {
      photo: "",
      nickname: nickName,
      realName: userName,
      wechatName: wechat,
      phone: phoneNumber,
      schoolCard: "adadad"
    }
    wx.request({
      url: 'http://45.40.251.242:8090/api/user/complete/info',
      header: {
        "Session-Token": getApp().globalData.token
      },
      method: 'post',
      data: postData,
      success: function(resp) {
        console.log(resp)
        if(resp.data.success){
          wx.showToast({
            title: '保存成功'
          })
          setTimeout(()=>{
            wx.navigateBack({
              delta: 1
            })
          },2000)
        }else{
          wx.showToast({
            title: '操作失败',
            icon: 'none'
          })
        }
      }
    })
  }
})
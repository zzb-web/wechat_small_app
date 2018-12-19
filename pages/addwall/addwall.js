// pages/addwall/addwall.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title : '',
    content : '',
    images : []
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
  titleInputHandle(e) {
    const value = e.detail.value;
    this.setData({
      title : value
    })
  },
  contentInputHandle(e) {
    const value = e.detail.value;
    this.setData({
      content: value
    })
  },
  chooseImage(e) {
    let that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        // console.log(res.tempFilePaths)
        let { images} = that.data;
        images = images.concat(res.tempFilePaths);
        images.length <= 3 ? images : images.slice(0, 3)
        console.log(images)
        that.setData({
          images
        })
      }
    })
  },
  removeImage(e) {
    const idx = e.target.dataset.idx
    let {images} = this.data;
    images.splice(idx, 1)
    this.setData({
      images
    })
  },
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
   let {images} = this.data;
    wx.previewImage({
      current: images[idx],  //当前预览的图片
      urls: images,  //所有要预览的图片
    })
  }
})
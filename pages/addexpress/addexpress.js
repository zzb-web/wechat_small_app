// pages/addexpress/addexpress.js
var common = require('../../common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    expressNumarray: [1, 2, 3, 4, 5, 6, 7, 8],
    expressWeightarray: ['轻小件(如衣服,小盒子等)', '中件(小于鞋盒)', '大件(需两手扛的)', '超大件(壮汉或两人扛)'],
    expressPlacearray: ['11', '22', '33'],
    multiArray: [
      [common.getDateStr(0), common.getDateStr(1)],
      ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
    ],
    multiArray_stop: [
      [common.getDateStr(0), common.getDateStr(1)],
      ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
    ],
    startTime: [
      [common.getDateStr_2(0), common.getDateStr_2(1)],
      ['9:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00', '17:00:00', '18:00:00', '19:00:00', '20:00:00', '21:00:00', '22:00:00', '23:00:00']
    ],
    endTime: [
      [common.getDateStr_2(0), common.getDateStr_2(1)],
      ['9:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00', '17:00:00', '18:00:00', '19:00:00', '20:00:00', '21:00:00', '22:00:00', '23:00:00']
    ],
    showStart: false,
    showEnd: false,
    numIndex: '',
    image: 'www.baidu.com',
    explainContent: '',
    weight: '',
    money: '',
    name: '',
    phone: '',
    wechat: '',
    expressPlace: '',
    receiveAddress: '',
    detailAddress: '',
    multiIndex: [0, 0],
    multiIndex_stop: [0, 0],
    noteContent: '',
    userName: '',
    userPhone: '',
    userSchoolCard: ''
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
      success: function(resp) {
        let {
          realName,
          phone,
          schoolCard
        } = resp.data.result.item;
        if (realName == '' || phone == '' || schoolCard == '') {
          wx.showModal({
            content: '请完善个人信息',
            success: function(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../personalinfo/personalinfo',
                })
              } else {

              }
            }
          })
        }
        that.setData({
          userName: realName,
          userPhone: phone,
          userSchoolCard: schoolCard
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
    console.log(9999999)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  bindPickerChange: function(e) {
    this.setData({
      numIndex: e.detail.value
    })
  },
  chooseImage(e) {
    let that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        let image = res.tempFilePaths;
        that.setData({
          image
        })
      }
    })
  },
  removeImage() {
    this.setData({
      image: ''
    })
  },
  handleImagePreview() {
    let {
      image
    } = this.data;
    wx.previewImage({
      current: image, //当前预览的图片
      urls: image, //所有要预览的图片
    })
  },
  contentInputHandle(e) {
    const value = e.detail.value;
    this.setData({
      explainContent: value
    })
  },
  bindWeightChange: function(e) {
    this.setData({
      weight: e.detail.value
    })
  },
  moneyInput(e) {
    this.setData({
      money: e.detail.value
    })
  },
  nameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  phoneInput(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  wechatInput(e) {
    this.setData({
      wechat: e.detail.value
    })
  },
  expressPlaceInput(e) {
    this.setData({
      expressPlace: e.detail.value
    })
  },
  receiveAddressInput(e) {
    this.setData({
      receiveAddress: e.detail.value
    })
  },
  detailAddressInput(e) {
    this.setData({
      detailAddress: e.detail.value
    })
  },
  noteInputHandle: function(e) {
    const value = e.detail.value;
    this.setData({
      noteContent: value
    })
  },
  bindMultiPickerChange: function(e) {
    this.setData({
      multiIndex: e.detail.value,
      showStart: true
    })
  },
  bindMultiPickerColumnChange: function(e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex,
      showStart: true
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  },
  bindMultiPickerChange_stop: function(e) {
    this.setData({
      multiIndex_stop: e.detail.value,
      showEnd: true
    })
  },
  bindMultiPickerColumnChange_stop: function(e) {
    var data = {
      multiArray_stop: this.data.multiArray_stop,
      multiIndex_stop: this.data.multiIndex_stop,
      showEnd: true
    };
    data.multiIndex_stop[e.detail.column] = e.detail.value;
    this.setData(data);
  },
  releaseHandle() {
    const {
      userName,
      userPhone,
      userSchoolCard
    } = this.data;
    console.log(userName,
      userPhone,
      userSchoolCard)
    if (userName == '' || userPhone == '' || userSchoolCard=='') {
      wx.showModal({
        content: '请完善个人信息',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../personalinfo/personalinfo',
            })
          } else {

          }
        }
      })
    
    } else {
      const {
        expressNumarray,
        expressWeightarray,
        numIndex,
        image,
        explainContent,
        weight,
        money,
        name,
        phone,
        wechat,
        expressPlace,
        receiveAddress,
        detailAddress,
        multiIndex,
        multiIndex_stop,
        noteContent,
        startTime,
        endTime
      } = this.data;
      let postData = {
        count: expressNumarray[numIndex],
        picture: image,
        description: explainContent,
        specification: expressWeightarray[weight],
        money: money * 100,
        recipient: name,
        phone: phone,
        wechatNo: wechat,
        expressAddress: expressPlace,
        deliveryAddress: receiveAddress,
        deliveryDetailedAddress: detailAddress,
        deliveryBegin: `${startTime[0][multiIndex[0]]} ${startTime[1][multiIndex[1]]}`,
        deliveryEnd: `${endTime[0][multiIndex_stop[0]]} ${endTime[1][multiIndex_stop[1]]}`,
        remark: noteContent
      }
      wx.request({
        url: 'http://45.40.251.242:8090/api/expresses/publish',
        header: {
          "Session-Token": getApp().globalData.token
        },
        method: 'post',
        data: postData,
        success: function(resp) {
          if (resp.data.success) {
            wx.showToast({
              title: '发布成功'
            })
            setTimeout(() => {
              wx.navigateTo({
                url: '../navbars/navbars?activeIndex=0',
              })
            }, 1000)
          } else {
            wx.showToast({
              title: '发布失败',
              icon: 'none'
            })
          }
        }
      })
    }

  }
})
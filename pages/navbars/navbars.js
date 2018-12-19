// pages/navbars/navbars.js
var common = require('../../common.js');
var sliderWidth = 96; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["快递", "求助", "闲置","上墙"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    showMoneyBox : true,
    showTimeBox : true,
    moneyFilter : ['全部','酬金由低到高','酬金由高到低'],
    timeFilter : ['全部','今天','明天'],
    activeTimeOption : 0,
    activeMoneyOption : 0,
    timeOptions : [9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    unusedMenus : ['全部','化妆品','衣服','生活类','学习类','其他'],
    unusedIndex: 0,
    unusedSliderOffset : 0,
    unusedSliderLeft : 0,
    expressLists:[],
    time:'',
    expressMore : true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {activeIndex} = options;
    this.setData({
      activeIndex
    })
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
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
    const { activeMoneyOption, time, activeIndex}= this.data;
    if (activeIndex == 0){
      this.getExpressList(activeMoneyOption, time);
    }

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
    console.log(123123123)
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
  showMoneyBoxHandle(){
    const {showMoneyBox} = this.data;
    this.setData({
      showMoneyBox : !showMoneyBox
    })
    this.hideTimeBoxHandle();
  },
  hideMoneyBoxHandle(){
    this.setData({
      showMoneyBox: true
    })
  },
  filterMoneyHandle:function(event){
    let { index } = event.target.dataset;
    let {activeMoneyOption,time} = this.data;
    if(activeMoneyOption != index){
      this.getExpressList(index,time)
      this.setData({
        activeMoneyOption : index,
        showMoneyBox: true
      })
    }
  },
  showTimeBoxHandle(){
    const { showTimeBox } = this.data;
    this.setData({
      showTimeBox: !showTimeBox
    })
    this.hideMoneyBoxHandle();
  },
  hideTimeBoxHandle() {
    this.setData({
      showTimeBox: true
    })
  },
  timeOptionHandle : function(event){
    let {index }= event.target.dataset;
    let {activeTimeOption,activeMoneyOption} = this.data;
    if(activeTimeOption != index){
      this.setData({
        activeTimeOption : index
      })
      if (index ==0){
        this.getExpressList(activeMoneyOption,'')
        this.setData({
          showTimeBox: true,
          time : ''
        })
      }
    }
  },
  detailTimeSelect(event){
    let {detailtime} = event.target.dataset;
    let { timeOptions, activeTimeOption, activeMoneyOption} = this.data;
    let time ='';
    if (activeTimeOption == 1){
      time = `${common.getDateStr_2(0)} ${timeOptions[detailtime]}:00:00`;
    }else{
      time = `${common.getDateStr_2(1)} ${timeOptions[detailtime]}:00:00`
    }
    this.getExpressList(activeMoneyOption,time);
    this.setData({
      time,
      showTimeBox:true
    })
  },
  toExpressDetail : function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../expressdetail/expressdetail?id=${id}`,
    })
  },
  addExpressHandle:function(){
    console.log('12312313')
    wx.navigateTo({
      url: '../addexpress/addexpress',
    })
  },
  toHelpDetail: function () {
    wx.navigateTo({
      url: '../helpdetail/helpdetail',
    })
  },
  addHelpHandle(){
    wx.navigateTo({
      url: '../addhelp/addhelp',
    })
  },
  toWallDetail:function(){
    wx.navigateTo({
      url: '../upperwall/upperwall',
    })
  },
  addWallHandle:function(){
    wx.navigateTo({
      url: '../addwall/addwall',
    })
  },
  loveWallHandle : function(){
    console.log(123123)
  },
  unusedTabClick(e){
    this.setData({
      unusedSliderOffset: e.currentTarget.offsetLeft,
      unusedIndex: e.currentTarget.id
    });
  },
  addUnused(){
    wx.navigateTo({
      url: '../addunused/addunused',
    })
  },
  toUnusedDetail(){
    wx.navigateTo({
      url: '../unuseddetail/unuseddetail',
    })
  },
  test(){
    console.log(444444)
  },
  //加载快递列表
  getExpressList(money,time){
    let that = this;
    let order = '';
    if(money==0){
      order = ''
    }else if(money ==1){
      order = 'l'
    }else{
      order = 'g'
    }
    let postData = {
      pageNo : 1,
      pageSize : 10,
      order :order,
      time : time
    }
    wx.request({
      url: 'http://45.40.251.242:8090/api/expresses',
      header: {
        "Session-Token": getApp().globalData.token
      },
      method:'post',
      data : postData,
      success: function (resp) {
        if (resp.data.success) {
          let lists = resp.data.result.items;
          lists.map((item,index)=>{
            item.endTime = common.getDate(item.deliveryEnd);
          })
          console.log(lists)
          that.setData({
            expressLists: lists
          })
        } else {
         
        }
      }
    })
  },
  moreExpressHandle(){
    this.setData({
      expressMore : false
    })
    let {activeMoneyOption,time} = this.data;
    this.getExpressList(activeMoneyOption,time)
  }
})
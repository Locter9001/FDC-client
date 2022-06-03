import config from "../../config/config";

let app = getApp();
let api = app['globalData'].api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: [
      {
        avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
        name: '默认用户',
        phone: '18888888888',
        inputTime: '2022-05-02 15:05:34',
        from: '小程序授权',
        other: '高铭的客户'
      },

    ]
  },
  report() {
    wx.navigateTo({
      url: '/pages/report/report',
    })
  },

  addUser() {
    wx.navigateTo({
      url: '/pages/addUser/report',
    })
  },

  telephone(e) {
    console.log(e.currentTarget.dataset['phone'],"哈哈哈")
    let phone = e.currentTarget.dataset['phone'];
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },

  init() {
    let token = wx.getStorageSync('token')
    let that = this;
    api.getData(config.host + '/liang-api/master/get-all-costomer/' + token).then((res) => {
      if (res.data.code === 200) {
        that.setData({
          show: res.data['customers']
        })
      }
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  },

  onRefresh() {
    let that = this
    //导航条加载动画
    wx.showNavigationBarLoading()
    //loading 提示框
    wx.showLoading({
      title: '加载中...',
    })
    console.log("下拉刷新啦");
    setTimeout(function () {
      wx.hideLoading();
      wx.hideNavigationBarLoading();
      that.init()
      //停止下拉刷新
      wx.stopPullDownRefresh();
    }, 2000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.init()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.onRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
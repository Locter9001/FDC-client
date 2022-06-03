Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
    name: "罗斯特er"
  },

  addHouse() {
    wx.navigateTo({
      url: '/pages/insertGoods/insertGoods'
    })
  },
  toSettings() {
    wx.navigateTo({
      url: '/pages/settingpage/setting'
    })
  },

  Masters() {
    wx.navigateTo({
      url: '/pages/user-update/user-update'
    })
  },

  allSignupUser() {
    wx.navigateTo({
      url: '/pages/signup-users/signup-users'
    })
  },


  toLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo !== undefined) {
      that.setData({
        avatar: userInfo.avatar,
        name: userInfo.name
      })
    }
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
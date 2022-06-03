// pages/settingpage/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location: true,
  },

  onChange({ detail }) {
    console.log(detail)
    let that = this;
    if (!detail) {
      wx.showModal({
        title: '提示',
        content: '关闭可能无法为您提供服务',
        success: (res) => {
          if (res.confirm) {
            that.setData({ location: detail });
          }
        },
      });
    } else {
      that.setData({ location: detail });
    }
  },

  exitLogin() {
    wx.showModal({
      title: '提示',
      content: '请确认是否要退出登录',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync() //清理本地缓存
          wx.reLaunch({
            url: '/pages/login/login'
          })
        }
      }
    })
  },


  onLoad(options) {

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
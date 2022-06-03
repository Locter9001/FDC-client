Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: []
  },

  showChange(e) {
    let that = this
    console.log(e.detail)
    that.setData({
      result: e.detail,
    });
  },

  selectOk() {
    let that = this;
    let select = that.data.result;
    wx.setStorageSync('select', select);
    wx.navigateBack();
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
    let that = this;
    let show = wx.getStorageSync('goods')
    that.setData({ show })
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
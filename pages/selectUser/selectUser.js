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
        customerName: '梁哥',
        customerPhone: '18888888888',
        inputTime: '2022-05-02 15:05:34',
        from: '小程序授权',
        remarks: '高铭的客户'
      }
    ]
  },

  selectUser(e) {
    wx.setStorageSync('selectUser', e.currentTarget.dataset.info)
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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
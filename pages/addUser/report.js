import config from "../../config/config";

let app = getApp();
let api = app['globalData'].api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender: "保密"
  },

  addCustomer() {
    let that = this;
    if (that.data.phone !== '' && that.data.name !== '') {
      let token = wx.getStorageSync('token')
      let gender;
      switch (that.data.gender) {
        case '男':
          gender = 1
              break;
        case '女':
          gender = 0
              break;
        case '保密':
          gender = 2
              break;
        default:
          break;
      }
      api.postData(config.host + '/liang-api/master/add-custom/' + token, {
        customerName: that.data.name,
        customerPhone: that.data.phone,
        customerGender: Number(gender),
        remarks: that.data.remarks
      }).then((res) => {
        if (res.data.code === 200) {
          that.setData({
            show: res.data['customers']
          })
          wx.showToast({
            title: "已提交",
            icon: "success",
            duration: 3000,
            success() {
              setTimeout(function () {
                wx.navigateBack()
              }, 500)
            }
          })
        } else {
          wx.showToast({
            title: "失败",
            icon: "none",
            duration: 3000
          })
        }
        console.log(res)
      }).catch((err) => {
        console.log(err)
        wx.showToast({
          title: "网络异常",
          icon: "none",
          duration: 3000
        })
      })
    }
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
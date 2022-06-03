import config from "../../config/config";

let app = getApp();
let api = app['globalData'].api
let scrollState = false;
let scrollNum;

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  toGoodsPage(e){
    console.log(e.currentTarget.dataset['idx'])
    let i = e.currentTarget.dataset['idx']
    let that = this;
    wx.setStorageSync('data', that.data.show[i])
    wx.navigateTo({
      url: '/pages/detail/detail'
    })
  },

  init() {
    let k = this
    console.log("加载商品列表")
    let token = wx.getStorageSync('token')
    if (token) {
      api.getData(config.host + '/liang-api/master/get-goods/' + token).then((goodsRes) => {
        console.log("返回信息",goodsRes)
        if (goodsRes.statusCode === 200) {
          wx.setStorageSync('goods', goodsRes.data)
          k.setData({
            show: goodsRes.data
          })
        }
      }).catch((goodsErr) => {
        console.log("错误信息", goodsErr)
      })
      console.log("加载成功")
    }
    return null
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    that.init()
  },

  onRefresh:function(){
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
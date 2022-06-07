// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imager: [
      "https://pic4.ajkimg.com/display/xinfang/0be7980e73954b6a79202608772cf6f9/600x450x98c.jpg",
      "https://pic4.ajkimg.com/display/xinfang/654f085e9e6ff26f692703fcb6eb6869/600x450x98c.jpg",
      "https://pic4.ajkimg.com/display/xinfang/3e2ed6634e3b5a78cab37614d7d8986c/600x450x98c.jpg"
    ],
    tags: [
      "学区房","海景","公园附近"
    ],
    price: "100万",
    time: "2022-10-22",
    location: "伊宁市开发区",
    houseTypes: [
      {
        src: "https://pic4.ajkimg.com/display/xinfang/0be7980e73954b6a79202608772cf6f9/600x450x98c.jpg",
        name: "梧桐丽景 102㎡",
        tags: ["在售","厨卫全明"],
        place: "102㎡",
        price: "5000元/㎡"
      },
      {
        src: "https://pic4.ajkimg.com/display/xinfang/654f085e9e6ff26f692703fcb6eb6869/600x450x98c.jpg",
        name: "梧桐丽景 102㎡",
        tags: ["在售","厨卫全明"],
        place: "82㎡",
        price: "5000元/㎡"
      },
      {
        src: "https://pic4.ajkimg.com/display/xinfang/3e2ed6634e3b5a78cab37614d7d8986c/600x450x98c.jpg",
        name: "梧桐丽景 102㎡",
        tags: ["在售","厨卫全明"],
        place: "72㎡",
        price: "5000元/㎡"
      }
    ],
    show: {},
    imageSrc: '',
    imageShow: false
  },

  onClickIcon() {
  },

  onClickButton() {
  },

  showImage(e) {
    let imageSrc = e.currentTarget.dataset.imagesrc;
    wx.previewImage({
      current: imageSrc, // 当前显示图片的 http 链接
      urls: [imageSrc] // 需要预览的图片 http 链接列表
    })
  },


  to_link() {
    let that = this;
    wx.navigateTo({
      url:"/pages/web-view/web-view?src=" + that.data.show.web_src
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    let data = wx.getStorageSync('data')
    that.setData({
      show: data
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
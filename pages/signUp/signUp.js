// pages/login/login.js
import config from "../../config/config";
// import Notify from "node_modules/@vant/weapp/dist/notify/notify";
// import Notify from 'path/to/@vant/weapp/dist/notify/notify';
let app = getApp();
let api = app['globalData']['api'];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginSrc: "https://img.tt98.com/d/file/96kaifa/20180105205316469/001.jpg",
    v_phone: '',
    v_sms: '',
    v_psw: '',
    time: '',
    state: false,
    v_name: '',
    v_other:''
  },


  /**
   * 跳至注册页面
   */
  signUp() {

  },

  submitSms() {
    let that = this;
    if (that.data.v_phone !== '') {
      console.log("点击了发送验证码")
      api.getData(config.host + "/liang-api/user/SMScode",{
        phone: that.data.v_phone
      }).then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
      that.setData({
        time: 60 * 1000,
        state: true
      })
    } else {
      wx.showToast({
        title: "请填写手机号",
        icon: "none",
        duration: 1500,
        mask: true
      })
    }
  },

  submit() {
    let that = this;
    if (that.data.v_phone !== '' || that.data.v_sms !== '' || that.data.v_psw !== '') {
      wx.login({
        success() {
          api.postData(config.host + "/liang-api/master/signup",{
            phone: that.data.v_phone,
            name: that.data.v_name,
            avatar: that.data.fileList[0].url,
            other: that.data.v_other,
            SMSCode: that.data.v_sms,
            psw: that.data.v_psw
          }).then((res)=>{
            if (res.statusCode === 200) {
              app['globalData']['userInfo'] = res.data;
              wx.setStorageSync('userInfo', res.data)
              wx.showModal({
                title: '申请提交成功',
                content: '您的注册申请已提交至管理员，结果将以短信方式通知您,请耐心等待',
                showCancel:false,
                success (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  }
                }
              })
            } else {
              wx.showToast({
                title: '失败' + res.statusCode,
                icon: 'none',
                duration: 2000,
                mask: true
              })
            }
            console.log(res)
          }).catch((err)=>{
            console.log(err)
          })
        }
      })
    }
  },


  time_end() {
    console.log("验证码倒计时结束")
    let that = this;
    that.setData({
      time: '',
      state: false
    })
  },


  //housePicture 户型图
  UpAvatar(e) {
    let that = this;
    const { file } = e.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: config.host + '/liang-api/master/upfile', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: { fileType: 'avatar' },
      success(res) {
        // 上传完成需要更新 fileList
        console.log(res)
        const data = JSON.parse(res.data)
        let fileList = [{
          message: data.message,
          status: data['uploading'],
          url: data.urls[0]
        }]
        that.setData({ fileList:fileList });
      },
    });
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
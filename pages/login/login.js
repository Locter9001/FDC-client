// pages/login/login.js
import config from "../../config/config";

let app = getApp();
let api = app['globalData'].api;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loginSrc: "https://img.tt98.com/d/file/96kaifa/20180105205316469/001.jpg",
        v_phone: '',
        v_sms: '',
        time: ''
    },


    /**
     * 跳至注册页面
     */
    signUp() {
        wx.navigateTo({
            url:"/pages/signUp/signUp"
        })
    },


    /**
     * 发送短信验证码
     */
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
                icon: "error",
                duration: 1500,
                mask: true
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


    /**
     * 登录
     */
    onLogin() {
        let that = this;
        if (that.data.v_phone !== '' || that.data.v_psw !== '') {
            console.log(that.data.v_phone,that.data.v_psw)
            api.postData(config.host + "/liang-api/master/login", {
                phone: that.data.v_phone,
                code: that.data.v_sms,
            }).then((res) => {
                if (res.statusCode === 200) {
                    app['globalData']['userInfo'] = res.data.userInfo;
                    wx.setStorageSync('userInfo', res.data.userInfo)
                    wx.setStorageSync('token', res.data['token'])
                    wx.setStorageSync('verify', res.data['verify'])
                    wx.switchTab({
                        url: '/pages/home/home'
                    })
                } else {
                    wx.showToast({
                        title: '失败' + res.statusCode,
                        icon: 'error',
                        duration: 2000,
                        mask: true
                    })
                }
                console.log(res)
            }).catch((err) => {
                console.log(err)
                wx.showToast({
                    title: '失败' + err.statusCode,
                    icon: 'error',
                    duration: 2000,
                    mask: true
                })

            })
        }
    },

    /**
     * 微信一键登录
     */
    bindGetUserInfo: function(e) {
        console.log("点击了登录")
        if (e.detail.userInfo) {
            //用户按了允许授权按钮
            let that = this;
            let code = '', _3rd_session = '';

            wx.login({
                //获取code
                success(res) {
                    code = res.code //返回code
                    wx.getUserInfo({
                        withCredentials: true,
                        lang: 'zh_CH',
                        success: (res) => {
                            api.postData(config.host + "/liang-api/user/quickLogin", {
                                code: code,
                                encryptedData: res.encryptedData,
                                iv: res.iv,
                                signature: res.signature
                            }).then((apiRes) => {
                                console.log(apiRes)
                                if (apiRes.statusCode === 200) {
                                    _3rd_session = apiRes.data['_3rd_session'] //返回登录态（用户标识）
                                    wx.setStorageSync('_3rd_session', _3rd_session);
                                    //获取sessionId
                                    wx.setStorageSync("sessionid", apiRes.header["Set-Cookie"]);
                                    //console.log(res.data.timestamp)
                                    wx.setStorageSync('userInfo', apiRes.data['userInfo'])
                                    wx.setStorageSync('token', apiRes.data['token'])
                                    wx.switchTab({
                                        url: '/pages/home/home'
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
                            }).catch((err) => {
                                console.log(err)
                                wx.showToast({
                                    title: '失败' + err.statusCode,
                                    icon: 'error',
                                    duration: 2000,
                                    mask: true
                                })
                            })
                        }
                    })
                }
            })
            // //授权成功后，跳转进入小程序首页
            // wx.switchTab({
            //     url: '/pages/index/index'
            // })
        } else {
            //用户按了拒绝按钮
            // wx.showModal({
            //     title: '警告',
            //     content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
            //     showCancel: false,
            //     confirmText: '返回授权',
            //     success: function(res) {
            //         if (res.confirm) {
            //             console.log('用户点击了“返回授权”')
            //         }
            //     }
            // })
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
        wx.hideHomeButton();
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
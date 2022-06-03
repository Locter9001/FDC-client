import config from "../../config/config";

let app = getApp();
let api = app['globalData']['api'];
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},


	showChange(e) {
		let that = this
		console.log(e.detail)
		that.setData({
			result: e.detail,
		});
	},

	reportSelectOk(e) {
		let that = this;
		let state = e.currentTarget.dataset.state;
		if (state) {
			that.setData({
				reportOK: true,
				reportBtnState: true
			})
		} else {
			that.setData({
				reportNO: true,
				reportBtnState: true
			})
		}
		let token = wx.getStorageSync('token')
		api.getData(config.host + '/liang-api/master/admin/add-master/' + token, {
			list: that.data.show[0].phone
		}).then((res) => {
			console.log("返回信息",res)
			if (res.statusCode === 200) {
				wx.showToast({
					title: '添加成功',
					icon: 'success'
				})
				this.init()
			}
		}).catch((goodsErr) => {
			console.log("错误信息", goodsErr)
		})
	},

	init() {
		let that = this;
		let token = wx.getStorageSync('token')
		if (token) {
			api.getData(config.host + '/liang-api/master/admin/get-all-signup-masters/' + token).then((res) => {
				console.log("返回信息",res)
				if (res.statusCode === 200) {
					that.setData({
						show: res.data['masters']
					})
				}
			}).catch((goodsErr) => {
				console.log("错误信息", goodsErr)
			})
			console.log("加载成功")
		}
	},



	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
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
import config from "../../config/config";

let app = getApp();
let api = app['globalData'].api
let timer;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		active: 1,
		show: [
			{
				Customer: {
					customerGender: 1,
					customerName: "高铭",
					customerPhone: "17800009001",
					remarks: "测试报备1"
				},
				building: "仁和·书香苑",
				id: 1,
				originator: "16609992042",
				receiver: "16609992042",
				receiverTime: "2022-05-30T04:26:41Z",
				reportStatus: 5,
				reportTime: "2022-05-28T22:29:29Z",
				reviewer: "16609992042",
				reviewerTime: "0001-01-01T00:00:00Z"
			}
		],
		RState: [
			"",
			"",
			"https://fang.shanxi0357.cn/src/reports/bbI0BZZbk2EPb16064ae3bd33afdc35ee26e8e992038.png",
			"https://fang.shanxi0357.cn/src/reports/A4oEArWU1WUQ31564d06ae5f29c3f049277feb6d4b95.png",
			"/src/default/report_lock1.png",
			""
		]
	},

	report(e) {
		let item = e.currentTarget.dataset.item
		wx.setStorageSync('item', item)
		wx.navigateTo({
			url: '/pages/report/report',
		})
	},

	theTabChange(e) {
		console.log(e.detail)
		let that = this;
		that.setData({
			active: e.detail.name
		})
	},

	toDetail(e) {
		console.log(e.currentTarget.dataset.item)
		let data = e.currentTarget.dataset.item;
		wx.setStorageSync('report', data)
		wx.navigateTo({
			url: '/pages/reportDetail/reportDetail'
		})
	},

	init() {
		let token = wx.getStorageSync('token')
		if (token) {
			let that = this;
			api.getData(config.host + '/liang-api/master/admin/get-all-report/' + token).then((res) => {
				if (res.data.code === 200) {
					that.setData({
						show: res.data['reports']
					})
				}
				console.log(res)
			}).catch((err) => {
				console.log(err)
			})
		}
	},

	onRefresh() {
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
	 * 生命周期函数--监听页面加载
	 */
	onLoad() {
		let that = this
		timer = setTimeout(function () {
			that.init()
		}, 500)
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
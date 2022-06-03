import config from "../../config/config";

let app = getApp();
let api = app['globalData'].api

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		RState: [
			"",
			"",
			"https://fang.shanxi0357.cn/src/reports/bbI0BZZbk2EPb16064ae3bd33afdc35ee26e8e992038.png",
			"https://fang.shanxi0357.cn/src/reports/A4oEArWU1WUQ31564d06ae5f29c3f049277feb6d4b95.png",
			"/src/default/report_lock1.png",
			""
		],
		showProcessList: [
			'报备',
			'带看',
			'成交'
		],
		show: {
			customerName: '梁',
			customerPhone: 18888888888,
			customerGender: 0,
			building: '中海国际公园城',
			reportTime: '2022-05-16 15:55:42',
			passTime: '2022-05-20 15:55:42',
			from: '津地产',
			centent: '高铭在疯狂敲代码',
			reportAdmin: '高铭/18800006666',
			fromCompany: '维卍科技有限公司',
			fromStores: '维卍地产',
			Admin: '陈佳娜',
			remark: '高铭在疯狂敲代码',
			AuditTime: '2022-05-25 23:47:36',
			feedBack: '报备通过，继续努力',
			state: 1
		},
		background: ''
	},


	returnPage() {
		wx.navigateBack();
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		let data = wx.getStorageSync('report');
		let that = this;
		console.log(data)
		let showIndex;
		switch (data.reportStatus) {
			case 2:
				showIndex = 1
				break;
			case 4:
				showIndex = 2
				break;
			case 5:
				showIndex = 3
				break;
		}
		let background;
		switch (data.Customer.customerGender) {
			case 0:
				background = 'background-color: #A855F7 !important;'
				break;
			case 1:
				background = 'background-color: #3B82F6 !important;'
		}
		that.setData({
			show: data,
			showIndex,
			backgroundColor: background,
			// backgroundImage: 'background-image:url(' +that.data.RState[data.reportStatus] + ');'
		})
	},

	passReport(token, state){
		return new Promise(resolve => {
			let that = this
			api.getData(config.host + '/liang-api/master/admin/pass-report/' + token, {
				id: that.data.show.id,
				state: state
			}).then((goodsRes) => {
				console.log("返回信息",goodsRes)
				if (goodsRes.statusCode === 200) {
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
						title: "操作失败",
						icon: "none"
					})
				}
				that.setData({
					reportNO: false,
					reportOK: false,
					reportBtnState: false
				})
			}).catch((goodsErr) => {
				console.log("错误信息", goodsErr)
				wx.showToast({
					title: "网络错误",
					icon: "none"
				})
				that.setData({
					reportNO: false,
					reportOK: false,
					reportBtnState: true
				})
			})
		})
	},

	lookPeport(token) {
		return new Promise(resolve => {
			let that = this
			api.getData(config.host + '/liang-api/master/look-report/' + token, {
				id: that.data.show.id,
			}).then((goodsRes) => {
				console.log("返回信息",goodsRes)
				if (goodsRes.statusCode === 200) {
					wx.showToast({
						title: "更新成功",
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
						title: "操作失败",
						icon: "none"
					})
				}
				that.setData({
					reportNO: false,
					reportOK: false,
					reportBtnState: false
				})
			}).catch((goodsErr) => {
				console.log("错误信息", goodsErr)
				wx.showToast({
					title: "网络错误",
					icon: "none"
				})
				that.setData({
					reportNO: false,
					reportOK: false,
					reportBtnState: true
				})
			})
		})
	},

	endReport(token, state) {
		return new Promise(resolve => {
			let that = this
			api.getData(config.host + '/liang-api/master/admin/ok-report/' + token, {
				id: that.data.show.id,
				state: state
			}).then((goodsRes) => {
				console.log("返回信息",goodsRes)
				if (goodsRes.statusCode === 200) {
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
						title: "操作失败",
						icon: "none"
					})
				}
				that.setData({
					reportNO: false,
					reportOK: false,
					reportBtnState: false
				})
			}).catch((goodsErr) => {
				console.log("错误信息", goodsErr)
				wx.showToast({
					title: "网络错误",
					icon: "none"
				})
				that.setData({
					reportNO: false,
					reportOK: false,
					reportBtnState: true
				})
			})
		})
	},

	reportSelectOk(e) {
		let that = this;
		let state = e.currentTarget.dataset.state;
		if (state) {
			that.setData({
				reportOK: true,
				reportBtnState: true
			})
			state = 2
		} else {
			that.setData({
				reportNO: true,
				reportBtnState: true
			})
			state = 3
		}
		let token = wx.getStorageSync('token')
		let status = that.data.show['reportStatus']
		switch (status) {
			case 1:
				that.passReport(token, state).then()
				break;
			case 2:
				that.lookPeport(token).then()
				break;
			case 4:
				if (state === 2) {
					that.endReport(token, 5).then()
				} else {
					that.endReport(token, 6).then()
				}
				break;
			default:
				break;
		}

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
import config from "../../config/config";

let app = getApp();
let api = app['globalData'].api
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		gender: "保密",
		customerMarkers:''
	},


	selectBuilding() {
		wx.navigateTo({
			url: '/pages/selectBuilding/selectBuilding'
		})
	},

	selectCustomer() {
		wx.navigateTo({
			url: '/pages/selectUser/selectUser'
		})
	},
	submitReport() {
		let that = this;
		let token = wx.getStorageSync('token')
		api.postData(config.host + '/liang-api/master/report/' + token, {
			Customer: {
				CustomerName: that.data.customer,
				CustomerPhone: that.data.customerPhone,
				CustomerGender: Number(that.data.gender),
				Remarks: that.data.customerMarkers,
			},
			Building: that.data.name,
		}).then((res) => {
			if (res.data.code === 200) {
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
			}
			console.log(res)
		}).catch((err) => {
			console.log(err)
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		wx.setStorageSync('selectUser', '')
		wx.setStorageSync('select', '')
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
		let selectUser = wx.getStorageSync('selectUser')
		if (selectUser != null) {
			that.setData({
				customer: selectUser.customerName,
				customerPhone: selectUser.customerPhone,
				gender: selectUser.customerGender+'',
			})
		}
		let selectGoods = wx.getStorageSync('select')
		console.log(selectGoods[0])
		if (selectGoods !== '' || selectGoods !== []) {
			let goods = wx.getStorageSync('goods')
			console.log(goods)
			if (goods !== undefined) {
				for (let i = 0; i < goods.length; i++) {
					if (goods[i].id === Number(selectGoods[0])) {
						that.setData({
							select: goods[i].id,
							name: goods[i].name
						})
						console.log(goods)
						break;
					}
				}
			}
		}
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
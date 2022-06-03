import config from '../../config/config'
let app = getApp()
let api = app['globalData'].api
let tag = '';
let pictures = [];
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		radio: '新房',
		name: '',
		price: '',
		checked: true,
		tags: [],
		startTime: '',
		show: false,
		address: {
			detail: '',
			lon: 0,
			lat: 0
		},
		FileList: [],
		houseForm: [
			{
				name: "",
				size: "",
				picture: "",
				state: "",
				decorateType: "",
				price: ''
			}
		]
	},

	onChange(event) {
		this.setData({
			radio: event.detail,
		});
	},

	onDisplay() {
		this.setData({ show: true });
	},

	onClose() {
		this.setData({ show: false });
	},

	formatDate(date) {
		date = new Date(date);
		return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
	},

	createTagValue(e) {
		tag = e.detail.value;
	},

	createTag() {
		let that = this;
		if (tag != null && tag !== '') {
			let tags = that.data.tags
			tags.push(tag)
			that.setData({
				tags: tags,
				tag: ''
			})
		}
	},

	onConfirm(event) {
		this.setData({
			show: false,
			startTime: this.formatDate(event.detail),
		});
	},

	onChangeAddress() {
		let that = this;
		wx.getLocation({
			type: 'gcj02', //返回可以用于wx.openLocation的经纬度
			success: function (res) {
				// const latitude = res.latitude;
				// const longitude = res.longitude;
				// const ugetaddress = 'userData.ugetaddress';
				wx.chooseLocation({
					success: function (res) {
						let address_info = res.address;
						let address = {
							detail: address_info,
							lon: res.longitude,
							lat: res.latitude
						}
						that.setData({
							address: address
						})
					},
					fail: function () {
						console.log(res);
					},
					complete: function () {
						// complete
					}
				})
			}
		})
	},


	afterRead(event) {
		let that = this;
		console.log(event)
		const { file } = event.detail;
		// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
		let token = wx.getStorageSync('token')
		wx.uploadFile({
			url: config.host + '/liang-api/master/upfile/' + token, // 仅为示例，非真实的接口地址
			filePath: file.url,
			name: 'file',
			formData: { fileType: 'report' },
			success(res) {
				// 上传完成需要更新 fileList
				let data = res.data
				const ress = JSON.parse(data)
				console.log(ress)
				const urls = ress.urls
				let FileList = that.data.FileList
				for (let i = 0; i < urls.length; i++) {
					pictures.push( urls[i] );
					FileList.push({ url: urls[i] })
				}
				console.log(FileList)
				that.setData({ FileList });
			},
		});
	},

	deleteThisForm(e) {
		console.log(e.currentTarget.dataset["index"])
		let that = this;
		let i = e.currentTarget.dataset["index"];
		let arr = that.data.houseForm;
		arr.splice(Number(i), 1)
		console.log(arr)
		that.setData({
			houseForm: arr
		})
	},

	onFormAddForm() {
		let that = this;
		let houseForm = that.data.houseForm
		houseForm.push({
			name: "",
			size: "",
			picture: "",
			state: "",
			decorateType: "",
			price: 0
		})
		that.setData({
			houseForm: houseForm
		})
	},
	//houseName 户型名称
	houseName(e) {
		let that = this;
		let form = that.data.houseForm
		let value = e.detail.value;
		let idx = Number(e.currentTarget.dataset.idx);
		form[idx].name = value
		that.setData({
			houseForm: form
		})
	},
	//houseSizePrice 每平方米价格
	houseSizePrice(e) {
		let that = this;
		let form = that.data.houseForm
		let value = e.detail.value;
		let idx = Number(e.currentTarget.dataset.idx);
		form[idx].price = value
		that.setData({
			houseForm: form
		})
	},
	//houseSize 户型大小
	houseSize(e) {
		let that = this;
		let form = that.data.houseForm
		let value = e.detail.value;
		let idx = Number(e.currentTarget.dataset.idx);
		form[idx].size = value
		that.setData({
			houseForm: form
		})
	},
	//houseDecorateType 户型装修类型
	houseDecorateType(e) {
		let that = this;
		let form = that.data.houseForm
		let value = e.detail.value;
		let idx = Number(e.currentTarget.dataset.idx);
		form[idx].decorateType = value
		that.setData({
			houseForm: form
		})
	},
	//houseState 户型销售状态
	houseState(e) {
		let that = this;
		let form = that.data.houseForm
		let idx = Number(e.currentTarget.dataset.idx);
		form[idx].state = e.detail
		that.setData({
			houseForm: form
		})
		console.log(e)
	},
	//housePicture 户型图
	housePicture(path, idx) {
		let that = this;
		let form = that.data.houseForm
		console.log(path, idx)
		let token = wx.getStorageSync('token')
		// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
		wx.uploadFile({
			url: config.host + '/liang-api/master/upfile/' + token, // 仅为示例，非真实的接口地址
			filePath: path,
			name: 'file',
			formData: { fileType: 'report' },
			success(res) {
				// 上传完成需要更新 fileList
				let data = res.data
				const ress = JSON.parse(data)
				console.log(ress)
				form[idx].picture = ress.urls[0]
				that.setData({
					houseForm: form
				})
			},
		});
	},
	browse(e) {
		let that = this;
		let idx = Number(e.currentTarget.dataset.idx);
		wx.chooseImage({
			count: 1,
			sizeType: ['original'],
			sourceType: ['album', 'camera'],
			success (res) {
				// tempFilePath可以作为 img 标签的 src 属性显示图片
				console.log("res: ", res)
				const path = res.tempFilePaths[0]
				console.log(path)
				that.housePicture(path, idx)
			}
		})
	},

	onClickLeft() {
		wx.switchTab({
			url: '/place/place'
		})
	},


	//提交
	formSubmit() {
		let that = this;
		let data = that.data.FileList
		let pictures = []
		for (let i = 0; i < data.length; i ++) {
			pictures.push( data[i].url )
		}
		const form = {
			goodsType: that.data.radio,
			name: that.data.name,
			tags: that.data.tags,
			price: that.data.price,
			startTime: that.data.startTime,
			address: that.data.address,
			pictures: pictures,
			houseType: that.data.houseForm
		}
		for (let fromKey in form) {
			if (fromKey !== 0 || fromKey !== '' ) {
				// return
			}
		}
		let token = wx.getStorageSync('token')
		api.postData(config.host + '/liang-api/master/insertGoods/' + token, form).then((res) => {
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
		}).catch(() => {
			wx.showToast({
				title: "网络错误",
				icon: "none",
				duration: 3000
			})
		})
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
import config from "../../config/config";

let app = getApp();
let api = app['globalData'].api
let scrollState = false;
let scrollNum;
let timer
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imageURL: "https://img01.yzcdn.cn/vant/ipad.jpeg",
		topTitle: "技术是开发它的人的共同灵魂。",
		customClass: "margin: 20rpx 30rpx;  border-radius: 10px;  overflow: hidden;  box-shadow:  0 0 16px #d1d1d1,  -5px -5px 16px #ffffff;",
		swiperCurrent:"",
		imager: [
			"https://pic4.ajkimg.com/display/xinfang/0be7980e73954b6a79202608772cf6f9/600x450x98c.jpg",
			"https://pic4.ajkimg.com/display/xinfang/654f085e9e6ff26f692703fcb6eb6869/600x450x98c.jpg",
			"https://pic4.ajkimg.com/display/xinfang/3e2ed6634e3b5a78cab37614d7d8986c/600x450x98c.jpg"
		],
		funcAreas: [
			{
				text: "新房楼盘",
				src: "/src/default/newHouse@2x.png"
			},
			{
				text: "新增报备",
				src: "/src/default/reports@2x.png"
			},
			{
				text: "我的客户",
				src: "/src/default/customs@2x.png"
			}
		],
		houses: [
			{
				houseType: '新房',
				price: "50万",
				title: "梧桐丽景精品二手房",
				content: "梧桐丽景精品二手房",
				src: "https://pic4.ajkimg.com/display/xinfang/3e2ed6634e3b5a78cab37614d7d8986c/600x450x98c.jpg",
				tags: [
					"二手房",
					"精装"
				]
			}
		]
	},

	scrollPage(e) {
		scrollState = e.detail.scrollTop > 185;
		let that = this;
		if (scrollState) {
			scrollNum = true;
			if (scrollNum){
				that.setData({
					customClass: "width:100%;border-radius: 0;margin:0;"
				})
			}
		} else {
			scrollNum = false;
			if (!scrollNum) {
				that.setData({
					customClass: "width: auto;"
				})
			}
		}
	},

	//swiper滑动事件
	swiperChange: function (e) {  //指示图标
		this.setData({
			swiperCurrent:e.detail.current
		})
	},

	onClickLeft() {
		// wx.showToast({ title: '点击返回', icon: 'none' });
	},

	onClickRight() {
		// wx.showToast({ title: '点击按钮', icon: 'none' });
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

	toPage(e) {
		console.log(e.currentTarget.dataset['idx'])
		let idx = e.currentTarget.dataset['idx']
		switch (idx) {
			case 0:
				wx.navigateTo({
					url: '/pages/houses/houses',
				})
				break;
			case 1:
				wx.navigateTo({
					url: '/pages/report/report',
				})
				break;
			case 2:
				wx.switchTab({
					url: '/pages/customer/customer'
				})
				break;
			default:

				break;
		}
	},
	shareGoods(e) {
		console.log(e)
		wx.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline']
		})
	},

	report() {
		wx.navigateTo({
			url: '/pages/report/report'
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
			clearTimeout(timer)
		}
		return null
	},


	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		let that = this
		console.log(options['status'], options)
		timer = setTimeout(function () {
			that.init()
		}, 500)
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

// {
//   price: "50万",
//       title: "梧桐丽景精品二手房",
//     content: "梧桐丽景精品二手房",
//     src: "https://pic4.ajkimg.com/display/xinfang/654f085e9e6ff26f692703fcb6eb6869/600x450x98c.jpg",
//     tags: [
//   "二手房",
//   "精装"
// ]
// },
// {
//   price: "50万",
//       title: "梧桐丽景精品二手房",
//     content: "梧桐丽景精品二手房",
//     src: "https://pic4.ajkimg.com/display/xinfang/0be7980e73954b6a79202608772cf6f9/600x450x98c.jpg",
//     tags: [
//   "二手房",
//   "精装"
// ]
// },
// {
//   price: "50万",
//       title: "梧桐丽景精品二手房",
//     content: "梧桐丽景精品二手房",
//     src: "https://pic4.ajkimg.com/display/xinfang/3e2ed6634e3b5a78cab37614d7d8986c/600x450x98c.jpg",
//     tags: [
//   "二手房",
//   "精装"
// ]
// },
// {
//   price: "50万",
//       title: "梧桐丽景精品二手房",
//     content: "梧桐丽景精品二手房",
//     src: "https://pic4.ajkimg.com/display/xinfang/654f085e9e6ff26f692703fcb6eb6869/600x450x98c.jpg",
//     tags: [
//   "二手房",
//   "精装"
// ]
// },
// {
//   price: "50万",
//       title: "梧桐丽景精品二手房",
//     content: "梧桐丽景精品二手房",
//     src: "https://pic4.ajkimg.com/display/xinfang/0be7980e73954b6a79202608772cf6f9/600x450x98c.jpg",
//     tags: [
//   "二手房",
//   "精装"
// ]
// },
// {
//   price: "50万",
//       title: "梧桐丽景精品二手房",
//     content: "梧桐丽景精品二手房",
//     src: "https://pic4.ajkimg.com/display/xinfang/3e2ed6634e3b5a78cab37614d7d8986c/600x450x98c.jpg",
//     tags: [
//   "二手房",
//   "精装"
// ]
// },
// {
//   price: "50万",
//       title: "梧桐丽景精品二手房",
//     content: "梧桐丽景精品二手房",
//     src: "https://pic4.ajkimg.com/display/xinfang/654f085e9e6ff26f692703fcb6eb6869/600x450x98c.jpg",
//     tags: [
//   "二手房",
//   "精装"
// ]
// },
// {
//   price: "50万",
//       title: "梧桐丽景精品二手房",
//     content: "梧桐丽景精品二手房",
//     src: "https://pic4.ajkimg.com/display/xinfang/0be7980e73954b6a79202608772cf6f9/600x450x98c.jpg",
//     tags: [
//   "二手房",
//   "精装"
// ]
// },
// {
//   price: "50万",
//       title: "梧桐丽景精品二手房",
//     content: "梧桐丽景精品二手房",
//     src: "https://pic4.ajkimg.com/display/xinfang/3e2ed6634e3b5a78cab37614d7d8986c/600x450x98c.jpg",
//     tags: [
//   "二手房",
//   "精装"
// ]
// },
// {
//   price: "50万",
//       title: "梧桐丽景精品二手房",
//     content: "梧桐丽景精品二手房",
//     src: "https://pic4.ajkimg.com/display/xinfang/654f085e9e6ff26f692703fcb6eb6869/600x450x98c.jpg",
//     tags: [
//   "二手房",
//   "精装"
// ]
// },
// {
//   price: "50万",
//       title: "梧桐丽景精品二手房",
//     content: "梧桐丽景精品二手房",
//     src: "https://pic4.ajkimg.com/display/xinfang/0be7980e73954b6a79202608772cf6f9/600x450x98c.jpg",
//     tags: [
//   "二手房",
//   "精装"
// ]
// }
import config from "config/config";

import api from "api/index";

import utils from "utils/util";

App({
	onLaunch() {
		let that = this
		let veify = wx.getStorageSync('verify')
		console.log("登录信息",veify)

		api.getData(config.host + '/liang-api/master/fast-login', {
			verify: veify
		}).then((res) => {
			if (res.statusCode === 200) {
				that['globalData']['userInfo'] = res.data.userInfo;
				wx.setStorageSync('userInfo', res.data.userInfo)
				wx.setStorageSync('token', res.data['token'])
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
			console.log("登录状态", err)
		})

		// if (userInfoverify.) {
		// 	console.log('缓存存在')
		// } else {
		// 	console.log('登录态过期')
		// 	wx.redirectTo({
		// 		url: '/pages/home/home?status=0'
		// 	})
		// }
	},
	globalData: {
		userInfo: null,
		api,
		utils
	}
})

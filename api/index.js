const getData = (url, param) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            method: 'GET',
            data: param,
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}

const postData = (url, param) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            data: param,
            header: { "content-Type": "application/json" },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success(res) {
                // console.log(res)
                resolve(res)
            },
            fail(err) {
                console.log(err)
                reject(err)
            }
        })
    })
}

// loading加载提示
const showLoading = () => {
    return new Promise((resolve, reject) => {
        wx.showLoading({
            title: '加载中...',
            mask: true,
            success(res) {
                console.log('显示loading')
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}

// 关闭loading
const hideLoading = () => {
    return new Promise((resolve) => {
        wx.hideLoading()
        console.log('隐藏loading')
        resolve()
    })
}

module.exports = {
    getData,
    postData,
    showLoading,
    hideLoading
}
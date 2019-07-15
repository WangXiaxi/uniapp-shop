import {
	url_base as baseUrl,
	url_key
} from '../common/config'
import store from '../store'
import md5 from '../common/SDK/md5.min.js'

/**
 * Request 0.0.7
 * @Class uni-app request网络请求库
 * @Author lu-ch
 * @Date 2019-07-11
 * @Email webwork.s@qq.com
 * http://ext.dcloud.net.cn/plugin?id=392
 * **/
export default class Request {
	config = {
		baseUrl,
		header: {
			'GET': {
				'Content-Type': 'application/json;charset=UTF-8'
			},
			'POST': {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			}
		},
		method: 'GET',
		dataType: 'json',
		responseType: 'text',
		success() {},
		fail() {},
		complete() {}
	}

	static posUrl(url) { /* 判断url是否为绝对路径 */
		return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
	}

	interceptor = {
		request: (f) => {
			if (f) {
				this.requestBeforeFun = f
			}
		},
		response: (f) => {
			if (f) {
				this.requestComFun = f
			}
		}
	}

	requestBeforeFun(config) {
		return config
	}

	requestComFun(response) {
		return response
	}

	setConfig(f) {
		this.config = f(this.config)
	}

	request(options = {}) {
		// 签名 时间戳 随机数
		const test = md5('23445')
		console.log(test)
		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.url = Request.posUrl(options.url) ? options.url : (options.baseUrl + options.url)
		options.data = options.data || {}
		options.method = options.method || this.config.method
		console.log(options.method)
		options.header = options.header || this.config.header[options.method]
		return new Promise((resolve, reject) => {
			let next = true
			let _config = null
			options.complete = (response) => {
				let statusCode = response.statusCode
				let data = response.data
				response.config = _config
				response = this.requestComFun(response)
				if (statusCode === 200) { // 成功
					switch (data.status) {
						case 'success':
							resolve(response.data)
							break
						case 'fail':
							uni.showToast({
								title: data.error,
								duration: 1500,
								mask: false,
								icon: 'none'
							})
							break
						case 'token30401':
							// 清空数据并跳转至登陆页
							store.commit('logout')
							uni.showToast({
								title: data.error,
								duration: 1500,
								mask: false,
								icon: 'none'
							})
							uni.redirectTo({
								url: '/pages/public/login'
							})
							break
					}
				} else {
					reject(response)
				}
			}
			let cancel = (t = 'handle cancel') => {
				let err = {
					errMsg: t,
					config: afC
				}
				reject(err)
				next = false
			}
			let afC = { ...this.config,
				...options
			}
			_config = { ...afC,
				...this.requestBeforeFun(afC, cancel)
			}
			if (!next) return
			uni.request(_config)
		}).catch(res => {
			Promise.reject(res)
		})
	}

	get(url, data, options = {}) {
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	}

	post(url, data, options = {}) {
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	}
}

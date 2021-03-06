import {
	url_base,
	url_key,
	url_sign
} from '../common/config'
import store from '../store'
import md5 from '../common/SDK/md5.min.js'
import qs from 'qs'

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
		baseUrl: url_base,
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
	static setPubParams(options = {}) {
		const token = store.getters.token
		if (token) Object.assign(options.header, {
			token
		})
		const time = new Date().getTime()
		const sign = `${time}${options.url.split('/service/')[1]}${url_key}`
		Object.assign(options.data, {
			time,
			sign: md5(sign)
		})
	}
	request(options = {}) {
		// 签名 时间戳 随机数
		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.url = Request.posUrl(options.url) ? options.url : (options.baseUrl + options.url)
		options.data = options.data || {}
		options.method = options.method || this.config.method
		options.header = options.header || this.config.header[options.method]
		Request.setPubParams(options)
		if (options.qs) options.data = qs.stringify(options.data)
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
							if (!options.noMessage) {
								uni.showToast({
									title: data.error,
									duration: 1500,
									mask: false,
									icon: 'none'
								})
							}
							reject(response)
							break
						case 'token30401':
							// 清空数据并跳转至登陆页
							store.commit('logout')
							store.commit('clearOut')
							if (!options.noredirect) uni.switchTab({
								url: '/pages/user/user'
							})
							reject(response)
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
	uploadFile(url, filePath, data, options = {}) {
		options.url = url
		options.data = data
		options.name = 'file'
		options.header = options.header || {}
		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.url = Request.posUrl(options.url) ? options.url : (options.baseUrl + options.url)
		options.formData = options.data || {}
		options.filePath = filePath
		Request.setPubParams(options)
		return new Promise((resolve, reject) => {
			uni.uploadFile(Object.assign(options, {
				complete: (response) => {
					let statusCode = response.statusCode
					let data = JSON.parse(response.data)
					if (statusCode === 200) { // 成功
						switch (data.status) {
							case 'success':
								resolve(data)
								break
							case 'fail':
								uni.showToast({
									title: data.error,
									duration: 1500,
									mask: false,
									icon: 'none'
								})
								reject(response)
								break
							case 'token30401':
								// 清空数据并跳转至登陆页
								store.commit('logout')
								store.commit('clearOut')
								if (!options.noredirect) uni.redirectTo({
									url: '/pages/public/login'
								})
								reject(response)
								break
						}
					} else {
						reject(response)
					}
				}
			}))
		})
	}
	// #ifdef H5
	/* post方式 */
	postExcelFile(params, url) {
		const form = document.createElement('form') // 创建form
		form.style.display = 'none'
		form.method = 'post'
		form.action = url
		document.body.appendChild(form)
		Object.keys(params).forEach(key => {
			const input = document.createElement('input') // 创建input
			input.type = 'hidden'
			input.name = key
			input.value = params[key]
			form.appendChild(input)
		})
		console.log(form)
		form.submit()
		form.remove()
	}
	// #endif
	
}

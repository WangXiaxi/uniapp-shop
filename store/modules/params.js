/**
 * @name    params store
 * @description 页面间跳转数据量较大 不宜放在路径上操作
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-07-22 17:43:24
 * @version $Id$
 */

const paramsStorage  = uni.getStorageSync('params')
const systemInfoStorage  = uni.getStorageSync('systemInfo')

let is_weixin = false // 默认允许显示 支付宝支付
// #ifdef H5
is_weixin = (function(){return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1})(); // 微信浏览器里不支持支付宝支付
// #endif

const params = {
	state: {
		isWeixin: is_weixin,
		params: paramsStorage ? paramsStorage : '', // 参数
		systemInfo: systemInfoStorage ? systemInfoStorage : '' // 系统信息
	},
	getters: {
		params: state => state.params,
		systemInfo: state => state.systemInfo, // 系统信息
		isWeixin: state => state.isWeixin
	},
	mutations: {
		setParams(state, params) {
			state.params = params
			uni.setStorageSync('params', params)
		},
		getSysInfo(state) {
			if (!state.systemInfo) {
				let systemInfo = uni.getSystemInfoSync()
				state.systemInfo = systemInfo
			}
		}
	},
	actions: {
	}
}

export default params

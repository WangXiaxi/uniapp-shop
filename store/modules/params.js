/**
 * @name    params store
 * @description 页面间跳转数据量较大 不宜放在路径上操作
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-07-22 17:43:24
 * @version $Id$
 */

const paramsStorage  = uni.getStorageSync('params')

const params = {
	state: {
		params: paramsStorage ? paramsStorage : '' // 参数
	},
	getters: {
		params: state => state.params
	},
	mutations: {
		setParams(state, params) {
			state.params = params
			uni.setStorageSync('params', params)
		}
	},
	actions: {
	}
}

export default params

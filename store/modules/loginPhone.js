/**
 * @name    login store
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-07-15 17:43:24
 * @version $Id$
 */
import phoneModel from '../../api/phone/index.js'

const login = {
	state: {
		tokenPhone: '',
		isLoginPhone: false
	},
	getters: {

	},
	mutations: {
		setTokenPhone(state, data) {
			state.tokenPhone = data
		}
	},
	actions: {
		// 注册并登陆 phone
		async loginPhone({
			commit
		}) { // 注册并登陆手机
			const {
				mobile
			} = uni.getStorageSync('userInfo')
			await phoneModel.register({
				mobile
			})
			this.isLoginPhone = true
		},
		// 注册并登陆 phone
		getTokenPhone({
			commit
		}) { // 注册并登陆手机
			commit('setTokenPhone', '')
			const {
				mobile
			} = uni.getStorageSync('userInfo')
			return phoneModel.getCallToken({
				mobile
			}).then(res => {
				commit('setTokenPhone', res.data.data)
				return res
			})
		}
	}
}

export default login

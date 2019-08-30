/**
 * @name    login store
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-07-15 17:43:24
 * @version $Id$
 */
import phoneModel from '../../api/phone/index.js'

const tokenPhoneStorage  = uni.getStorageSync('tokenPhone')

const login = {
	state: {
		tokenPhone: tokenPhoneStorage ? tokenPhoneStorage : ''
	},
	getters: {

	},
	mutations: {

	},
	actions: {
		// 注册并登陆 phone
		async loginPhone({ commit }) { // 注册并登陆手机
			const { mobile } = uni.getStorageSync('userInfo')
			phoneModel.getToken({ mobile }).then(res => {
				console.log(res)
			})
		}
	}
}

export default login

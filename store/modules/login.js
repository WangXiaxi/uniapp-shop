/**
 * @name    login store
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-07-15 17:43:24
 * @version $Id$
 */

const tokenStorage  = uni.getStorageSync('token')
const userInfoStorage  = uni.getStorageSync('userInfo')
const hasLoginStorage = !!tokenStorage

console.log(tokenStorage, userInfoStorage, hasLoginStorage)

const login = {
	state: {
		hasLogin: hasLoginStorage,
		token: tokenStorage ? tokenStorage : '',
		userInfo: userInfoStorage ? userInfoStorage : {}
	},
	getters: {
		hasLogin:  state => state.hasLogin,
		token: state => state.token,
		userInfo: state => state.userInfo
	},
	mutations: {
		login(state, token) {
			state.hasLogin = true
			state.token = token
			uni.setStorageSync('token', token) // 缓存用户登陆状态
		},
		logout(state) {
			state.hasLogin = false
			state.token = ''
			state.userInfo = {}
			uni.removeStorageSync('userInfo')
			uni.removeStorageSync('token')
		}
	},
	actions: {
	}
}

export default login

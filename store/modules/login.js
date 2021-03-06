/**
 * @name    login store
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-07-15 17:43:24
 * @version $Id$
 */
import mineModel from '../../api/mine/index.js'

const tokenStorage  = uni.getStorageSync('token')
const userInfoStorage  = uni.getStorageSync('userInfo')
const hasLoginStorage = !!tokenStorage

const login = {
	state: {
		hasLogin: hasLoginStorage, // 判断是否是登陆状态
		token: tokenStorage ? tokenStorage : '',
		userInfo: userInfoStorage ? userInfoStorage : {}
	},
	getters: {
		hasLogin: state => state.hasLogin,
		token: state => state.token,
		userInfo: state => state.userInfo
	},
	mutations: {
		login(state, token) {
			return new Promise((resolve, reject) => {
				state.hasLogin = true
				state.token = token
				uni.setStorageSync('token', token) // 缓存用户登陆状态
				resolve(token)
			})
		},
		logout(state) {
			state.hasLogin = false
			state.token = ''
			state.userInfo = {}
			uni.removeStorageSync('userInfo')
			uni.removeStorageSync('token')
		},
		setUserInfo(state, data) {
			const datas = JSON.parse(JSON.stringify(data))
			state.userInfo = datas
			uni.setStorageSync('userInfo', datas) // 缓存用户
		}
	},
	actions: {
		goLogin({ state }, callback = () => {}) { // 判断是否登录 也可直接
			if (!state.hasLogin) {
				uni.navigateTo({
					url: '/pages/public/login'
				})
			} else {
				callback()
			}
		},
		getUserInfo({ commit }) { // 获取用户信息
			return mineModel.getMemberInfo().then(res => {
				commit('setUserInfo', res.data)
				return res
			})
		}
	}
}

export default login

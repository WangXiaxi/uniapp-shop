import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		token: '',
		userInfo: {}
	},
	mutations: {
		login(state, token) {
			state.hasLogin = true;
			state.token = token;
			uni.setStorage({//缓存用户登陆状态
			    key: 'token',
			    data: token
			})
		},
		logout(state) {
			state.hasLogin = false;
			state.token = '';
			state.userInfo = {};
			uni.removeStorage({ key: 'userInfo' })
			uni.removeStorage({ key: 'token' })
		}
	},
	actions: {
	
	}
})

export default store

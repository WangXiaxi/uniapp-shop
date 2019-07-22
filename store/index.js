import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import cart from './modules/cart'
import params from './modules/params'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		login,
		cart,
		params
	}
})

export default store

import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import cart from './modules/cart'
import params from './modules/params'
import search from './modules/search'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		login,
		cart,
		params,
		search
	}
})

export default store

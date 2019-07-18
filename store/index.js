import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import cart from './modules/cart'


Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		login,
		cart
	}
})

export default store

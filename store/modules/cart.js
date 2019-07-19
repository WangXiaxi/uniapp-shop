/**
 * @name    cart store
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-07-18 17:43:24
 * @version $Id$
 */
import productModel from '../../api/product/index.js'
const favoriteStorage = uni.getStorageSync('favoriteStorage')

import {
	url_image
} from '../../common/config/index.js'
const cart = {
	state: {
		cart_list: [], // 商品列表
		final_sum: 0, // 最终金额
		cart_count: 0, // 购物车选中数量
		favorite: favoriteStorage ? favoriteStorage : null, // 收藏list 
	},
	getters: {
		cart_list: state => state.cart_list,
		final_sum: state => state.final_sum,
		cart_count: state => state.cart_count,
		favorite: state => state.favorite
	},
	mutations: {
		setCart(state, {
			goodsList,
			final_sum,
			count
		}) {
			state.cart_list = goodsList.map(c => {
				c.img = `${url_image}/${c.img}`
				return c
			})
			state.final_sum = final_sum
			state.cart_count = count
		},
		setFavorite(state, list) {
			state.favorite = list ? list : [],
				uni.setStorageSync('favoriteStorage', state.favorite) // 缓存最爱
		},
		clearOut(state) {
			state.cart_list = []
			state.final_sum = 0
			state.cart_count = 0
			state.favorite = null
			uni.removeStorageSync('favoriteStorage')
		}
	},
	actions: {
		getCartInfo({
			commit
		}) { // 获取购物车操作
			return productModel.getCartList().then(res => {
				commit('setCart', res.data)
				return res
			})
		},
		removeCart({
			commit
		}, params) { // 删除购物车
			return productModel.removeCart(params)
		},
		removeCart({
			commit
		}, params) { // 删除购物车
			return productModel.removeCart(params)
		},
		exceptCartGoods({
			commit
		}, params) { // 取消选中
			return productModel.exceptCartGoods(params).then(res => {
				commit('setCart', res.data)
				return res
			})
		},
		addNumCart({
			commit
		}, params) { // 购物车数量添加
			return productModel.joinCart(params)
		},
		clearCart({
			commit
		}, params) { // 清空购物车
			commit('setCart', {
				goodsList: [],
				final_sum: 0,
				count: 0
			})
			return productModel.clearCart(params)
		},
		getGoodsFavoriteIds({
			commit
		}, params) { // 获取收藏
			return productModel.getGoodsFavoriteIds(params).then(res => {
				commit('setFavorite', res.data)
				return res
			})
		},
		goodsFavoriteEdit({
			commit
		}, params) {
			return productModel.goodsFavoriteEdit(params).then(res => {
				commit('setFavorite', res.data)
				return res
			})
		}
	}
}

export default cart

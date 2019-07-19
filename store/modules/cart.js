/**
 * @name    cart store
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-07-18 17:43:24
 * @version $Id$
 */
import productModel from '../../api/product/index.js'

import {
	url_image
} from '../../common/config/index.js'
const cart = {
	state: {
		cart_list: [], // 商品列表
		final_sum: 0, // 最终金额
		cart_count: 0 // 购物车选中数量
	},
	getters: {
		cart_list: state => state.cart_list,
		final_sum: state => state.final_sum,
		cart_count: state => state.cart_count
	},
	mutations: {
		setCart: (state, {
			goodsList,
			final_sum,
			count
		}) => {
			state.cart_list = goodsList.map(c => {
				c.img = `${url_image}/${c.img}`
				return c
			})
			state.final_sum = final_sum
			state.cart_count = count
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
		removeCart({ commit }, params) { // 删除购物车
			return productModel.removeCart(params)
		},
		removeCart({ commit }, params) { // 删除购物车
			return productModel.removeCart(params)
		},
		exceptCartGoods({ commit }, params ) { // 取消选中
			return productModel.exceptCartGoods(params).then(res => {
				commit('setCart', res.data)
				return res
			})
		},
		addNumCart({ commit }, params) { // 购物车数量添加
			return productModel.joinCart(params)
		}
	}
}

export default cart

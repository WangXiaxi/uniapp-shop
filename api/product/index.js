import Request from '../../utils/request'
/**
 * @name    ProductModel封装
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-07-16 15:43:24
 * @version $Id$
 */

class ProductModel extends Request {
	// 获取分类
	getProductList(params) {
		return this.get('/service/getProductList', params)
	}
	// 获取商品详情
	bothProducts(params) {
		return this.get('/service/bothProducts', params)
	}
	// 加入购物车的
	joinCart(params) {
		return this.post('/service/joinCart', params)
	}
	// 获取购物车
	getCartList(params) {
		return this.post('/service/getCartList', params, { noredirect: true })
	}
	// 购物车移除
	removeCart(params) {
		return this.post('/service/removeCart', params)
	}
	// 购物车取消选中
	exceptCartGoods(params) {
		return this.post('/service/exceptCartGoods', params, { qs: true })
	}
	// 收藏
	goodsFavoriteEdit() {
		return this.post('/service/goodsFavoriteEdit', params)
	}
	// 清空购物车
	clearCart(params) {
		return this.post('/service/clearCart', params)
	}
}

const productModel = new ProductModel()

export default productModel

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
		return this.post('/service/getCartList', params)
	}
}

const productModel = new ProductModel()

export default productModel

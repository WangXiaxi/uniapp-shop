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
}

const productModel = new ProductModel()

export default productModel

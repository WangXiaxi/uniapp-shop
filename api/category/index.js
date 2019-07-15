import Request from '../../utils/request'

/**
 * @name    CategoryModel封装
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-07-15 16:43:24
 * @version $Id$
 */

class CategoryModel extends Request {
	// 获取一级分类
	getcategoryFirst(params) {
		return this.get('/service/getBothCategoryListTopType', params)
	}
	// 获取分类
	getcategorySecond(params) {
		return this.get('/service/getBothCategoryByParentidType', params)
	}
	// 获取分类
	getcategoryThird(params) {
		return this.get('/service/getBothGoods', params)
	}
}

const categoryModel = new CategoryModel()

export default categoryModel

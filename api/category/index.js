import Request from '../../utils/request'

/**
 * @name    CategoryModel封装
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-07-15 16:43:24
 * @version $Id$
 */

class CategoryModel extends Request {
	// 获取分类
	getAllCategoryList(params) {
		return this.get('/service/getAllCategoryList', params)
	}
}

const categoryModel = new CategoryModel()

export default categoryModel

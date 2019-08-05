import Request from '../../utils/request'
/**
 * @name    recommendModel封装
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-08-05 19:43:24
 * @version $Id$
 */

class RecommendModel extends Request {
	// 获取我的推荐
	getMyTeam(params) {
		return this.get('/service/getMyTeam', { ...params, paging: true })
	}
}

const recommendModel = new RecommendModel()

export default recommendModel

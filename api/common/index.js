import qs from 'qs'
import Request from '../../utils/request'

/**
 * @name    CommonModel封装
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-06-014 19:03:24
 * @version $Id$
 */

class CommonModel extends Request {
	test() {
		return this.get('/site/promotionRuleAjax')
	}
}

const commonModel = new CommonModel()

export default commonModel

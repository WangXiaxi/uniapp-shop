import qs from 'qs'
import Request from '../../utils/request'

/**
 * @name    CommonModel封装
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-07-15 19:03:24
 * @version $Id$
 */

class CommonModel extends Request {
	test() {
		return this.get('/service/userToken')
	}
}

const commonModel = new CommonModel()

export default commonModel

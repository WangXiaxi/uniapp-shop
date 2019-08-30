import Request from '../../utils/request'
/**
 * @name    PhoneModel封装
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-08-30 15:43:24
 * @version $Id$
 */

class PhoneModel extends Request {
	// 获取通话记录
	getCallLog(params) {
		return this.get('/anyCall/getCallLog', params)
	}
	// 注册
	register(params) {
		return this.POST('/anyCall/register', params)
	}
	// 获取token
	getToken(params) {
		return this.get('/anyCall/getToken', params)
	}
}

const phoneModel = new PhoneModel()

export default phoneModel

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
		return this.get('/service/getLocalCallLog', params, {
			noMessage: true
		})
	}
	// 注册
	register(params) {
		console.log(params)
		return this.post('/service/registerCall', params, {
			noMessage: true
		})
	}
	// 获取token
	getCallToken(params) {
		return this.get('/service/getCallToken', params, {
			noMessage: true
		})
	}
	// 获取token
	callUser(params) {
		return this.post('/service/callUser', params)
	}
}

const phoneModel = new PhoneModel()

export default phoneModel

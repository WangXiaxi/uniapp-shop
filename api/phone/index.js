import Request from '../../utils/request'
import WxValidate from '../../utils/validate'
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
	// 打电话
	callUser(params) {
		return this.post('/service/callUser', params)
	}
	// 充值
	rechangeCall(params) {
		return this.post('/service/rechangeCall', params)
	}
	// getCallBalance
	getCallBalance(params) {
		return this.post('/service/getCallBalance', params)
	}
	/**
	 * 验证表单
	 */
	initValidate(rules, messages) {
		// 创建实例对象
		this.WxValidate = new WxValidate(rules, messages)
	}
}

const phoneModel = new PhoneModel()

export default phoneModel

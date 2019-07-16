import Request from '../../utils/request'
import WxValidate from '../../utils/validate'

/**
 * @name    LoginModel封装
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-07-15 13:03:24
 * @version $Id$
 */

class LoginModel extends Request {
	// 登录接口
	login(params) {
		return this.post('/service/userToken', params)
	}
	// 获取验证码
	getMobileCode(params) {
		return this.post('/service/getMobileCode', params)
	}
	// 手机号找回密码提交
	findPassWordByMobile(params) {
		return this.post('/service/findPassWordByMobile', params)
	}
	/**
	 * 验证表单
	 */
	initValidate(rules, messages) {
		// 创建实例对象
		this.WxValidate = new WxValidate(rules, messages)
	}
}

const loginModel = new LoginModel()

export default loginModel

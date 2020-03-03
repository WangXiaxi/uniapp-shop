import Request from '../../utils/request'
import WxValidate from '../../utils/validate'
import { getCaptcha } from '../../utils/getCaptcha'

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
	// 获取 验证码 注册
	getRegMobileCode(params) {
		return this.post('/service/getRegMobileCode', params)
	}
	// 手机号找回密码提交
	findPassWordByMobile(params) {
		return this.post('/service/findPassWordByMobile', params)
	}
	// 注册
	register(params) {
		return this.post('/service/register', params)
	}
	// 获取图形码
	getCaptcha() {
		return getCaptcha('getCaptcha')
	}
	// 修改密码
	changePassword(params) {
		return this.post('/service/changePassword', params)
	}
	// 获取协议
	getUserAgreement(params) {
		return this.get('/service/getUserAgreement', params)
	}
	// 获取系统注册配置接口
	getRegOption(params) {
		return this.get('/service/getRegOption', params)
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

import Request from '../../utils/request'
import WxValidate from '../../utils/validate'
/**
 * @name    recommendModel封装
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-08-05 19:43:24
 * @version $Id$
 */

class RecommendModel extends Request {
	// 获取我的推荐
	getMyTeam(params) {
		return this.get('/service/getMyTeam', { ...params })
	}
	// 获取激活金额接口
	getBecomVipAmount(params) {
		return this.get('/service/getBecomVipAmount', { ...params })
	}
	// 激活会员
	activateMember(params) {
		return this.post('/service/activateMember', { ...params })
	}
	/**
	 * 验证表单
	 */
	initValidate(rules, messages) {
		// 创建实例对象
		this.WxValidate = new WxValidate(rules, messages)
	}
}

const recommendModel = new RecommendModel()

export default recommendModel

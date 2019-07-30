import Request from '../../utils/request'
import WxValidate from '../../utils/validate'
/**
 * @name    MineModel封装
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-07-16 15:43:24
 * @version $Id$
 */

class MineModel extends Request {
	// 地址获取接口
	getUcenterAddressList(params) {
		return this.get('/service/getUcenterAddressList', params)
	}
	// 地址接口
	addressEdit(params) {
		return this.post('/service/addressEdit', params)
	}
	// 地址删除
	addressDel(params) {
		return this.post('/service/addressDel', params)
	}
	// 商品收藏列表
	getFavoriteList() {
		return this.get('/service/getFavoriteList')
	}
	// 获取用户信息
	getMemberInfo() {
		return this.get('/service/getMemberInfo', {}, { noredirect: true })
	}
	/**
	 * 验证表单
	 */
	initValidate(rules, messages) {
		// 创建实例对象
		this.WxValidate = new WxValidate(rules, messages)
	}
}

const mineModel = new MineModel()

export default mineModel

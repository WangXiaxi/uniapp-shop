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
		return this.get('/service/getUserInfo', {}, {
			noredirect: true
		})
	}
	// 上传头像
	uploadUserIco(file, params = {}) {
		return this.uploadFile('/service/uploadUserIco', file, params)
	}
	// 实名图片上传
	uploadRealNamePhoto(file, params = {}) {
		return this.uploadFile('/service/uploadRealNamePhoto', file, params)
	}
	// 实名
	realNameSave(params) {
		return this.post('/service/realNameSave', { ...params
		})
	}
	// 获取实名信息
	getRealNameInfo(params = {}) {
		return this.post('/service/getRealNameInfo', { ...params
		})
	}
	// 获取消息列表
	getMessageList(params = {}) {
		return this.post('/service/getMessageList', { ...params,
			limit: 10,
			paging: true
		})
	}
	// 删除消息
	delMessage(params = {}) {
		return this.post('/service/delMessage', { ...params })
	}
	// 删除消息
	version(params = {}) {
		return this.get('/service/getAppVersion', { ...params })
	}
	// 获取轮播图
	getBannerList(params = {}) {
		return this.get('/service/getBannerList', { ...params })
	}
	// 获取精选
	getHomeCatList(params = {}) {
		return this.get('/service/getHomeCatList', { ...params })
	}
	// 获取推荐
	getRecomProductList(params = {}) {
		return this.get('/service/getRecomProductList', { ...params })
	}
	// 获取外链
	getRegAgreement(params = {}) {
		return this.get('/service/getRegAgreement', { ...params })
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

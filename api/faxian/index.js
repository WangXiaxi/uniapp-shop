import Request from '../../utils/request'

/**
 * @name    CategoryModel封装
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2020-01-07 18:43:24
 * @version $Id$
 */

class FaxianModel extends Request {
	// 获取周边油站接口
	searchAllOilByRedis(params) {
		return this.get('/service/searchAllOilByRedis', { ...params, noToken: true, page_size: 10, mobile: '18055603791' })
	}
	// 获取油品列表接口
	getOilType(params) {
		return this.get('/service/getOilType', { ...params, noToken: true })
	}
	// 获取加油订单
	getOrderMoney(params) {
		return this.get('/service/getOrderMoney', { ...params })
	}
	// 生成订单
	generateOrder(params) {
		return this.post('/service/generateOrder', { ...params })
	}
	// 支付获取
	recordUserBuy(params) {
		console.log(params)
		return this.get('/service/recordUserBuy', { ...params })
	}
}

const faxianModel = new FaxianModel()

export default faxianModel

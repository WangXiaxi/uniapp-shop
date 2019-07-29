import Request from '../../utils/request'
/**
 * @name    OrderModel封装
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-07-16 15:43:24
 * @version $Id$
 */

class OrderModel extends Request {
	// 订单信息收集
	shopping(params) {
		return this.post('/service/shopping', { ...params, origin: 'Ydui' })
	}
	// 获取相应物流信息
	getOrderDelivery(params) {
		return this.post('/service/getOrderDelivery', { ...params, origin: 'Ydui' })
	}
	// 订单列表
	getOrderListByState(params) {
		return this.get('/service/getOrderListByState', { ...params, limit: 10 })
	}
	// 生成订单
	confirmOrder(params) {
		return this.post('/service/confirmOrder', { ...params, origin: 'Ydui' })
	}
	// 获取支付方式
	getPaymentList() {
		return this.get('/service/getPaymentList')
	}
}

const orderModel = new OrderModel()

export default orderModel

import Request from '../../utils/request'
import WxValidate from '../../utils/validate'
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
		return this.get('/service/getOrderListByState', { ...params, limit: 10, paging: true })
	}
	// 生成订单
	confirmOrder(params) {
		return this.post('/service/confirmOrder', { ...params, origin: 'Ydui' })
	}
	// 获取支付方式
	getPaymentList() {
		return this.get('/service/getPaymentList')
	}
	// 删除订单
	orderDel(params) {
		return this.post('/service/orderDel', params)
	}
	// 订单详情
	getOrderDetail(params) {
		return this.get('/service/getOrderDetail', params)
	}
	// 订单操作接口
	updateOrderStatus(params) {
		return this.post('/service/updateOrderStatus', params)
	}
	// 评价图片上传
	uploadCommonImg(file, params = {}) {
		return this.uploadFile('/service/uploadCommonImg', file, params)
	}
	// 评价列表
	getUcenterCommonList(params) {
		return this.get('/service/getUcenterCommonList',  { ...params, limit: 10, paging: true })
	}
	// 评价接口
	updateCommonGoods(params) {
		return this.post('/service/updateCommonGoods',  { ...params })
	}
	// 获取售后详情
	getRefundsDetail(params) {
		return this.get('/service/getRefundsDetail',  { ...params })
	}
	// 申请售后提交
	updateRefunds(params) {
		return this.post('/service/updateRefunds',  { ...params })
	}
	// 请售后图片上传
	uploadRefundsImg(file, params = {}) {
		return this.uploadFile('/service/uploadRefundsImg', file, params)
	}
	// 支付
	doPay(params = {}) {
		return this.post('/service/doPay', params)
	}
	/**
	 * 验证表单
	 */
	initValidate(rules, messages) {
		// 创建实例对象
		this.WxValidate = new WxValidate(rules, messages)
	}
}

const orderModel = new OrderModel()

export default orderModel

import Request from '../../utils/request'
/**
 * @name    MoneyModel封装
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-08-03 09:43:24
 * @version $Id$
 */

class MoneyModel extends Request {
	// 地址获取接口
	getUcenterAccountLog(params) {
		return this.get('/service/getUcenterAccountLog', { ...params, paging: true })
	}
	
	
}

const moneyModel = new MoneyModel()

export default moneyModel

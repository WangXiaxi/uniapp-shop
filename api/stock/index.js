import Request from '../../utils/request'
/**
 * @name    StockModel封装
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-08-05 15:43:24
 * @version $Id$
 */

class StockModel extends Request {
	// 获取股权
	getUcenterStocksLog(params) {
		return this.get('/service/getUcenterStocksLog', { ...params, paging: true })
	}
}

const stockModel = new StockModel()

export default stockModel

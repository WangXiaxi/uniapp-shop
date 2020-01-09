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
		return this.get('/service/getUcenterStocksLog', { ...params,
			paging: true
		})
	}
	// 获取 证书信息
	getStocksInfo(params) {
		return this.get('/service/getStocksInfo', { ...params })
	}
	// 计算可兑换多少接口
	calcEquityToBT(params) {
		return this.get('/service/calcEquityToBT', { ...params })
	}
	// 兑换操作提交接口
	equityToBT(params) {
		return this.post('/service/equityToBT', { exc_type: 1, ...params })
	}
}

const stockModel = new StockModel()

export default stockModel

import Request from '../../utils/request'
/**
 * @name    MoneyModel封装
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-08-03 09:43:24
 * @version $Id$
 */

class MoneyModel extends Request {
	// 余额明细
	getUcenterAccountLog(params) {
		return this.get('/service/getUcenterAccountLog', { ...params,
			paging: true
		})
	}

	// vip消费
	getUcenterRevisitLog(params) {
		return this.get('/service/getUcenterRevisitLog', { ...params,
			paging: true
		})
	}
	// 获取银行卡
	getMemberBankInfo(params) {
		return this.get('/service/getMemberBankInfo', { ...params
		})
	}
	// 提现申请
	withdraw(params) {
		return this.post('/service/withdraw', { ...params
		})
	}
	/**
	 * 验证表单
	 */
	initValidate(rules, messages) {
		// 创建实例对象
		this.WxValidate = new WxValidate(rules, messages)
	}
}

const moneyModel = new MoneyModel()

export default moneyModel

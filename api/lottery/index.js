	import Request from '../../utils/request'
	import WxValidate from '../../utils/validate'
	
	class LotteryModel extends Request {
		// 保存抽奖用户信息
		lotterySave(params) {
			return this.post('/service/lotterySave', params)
		}
		
		// 表单验证
		initValidate(rules, messages) {
			this.WxValidate = new WxValidate(rules, messages)
		}
	}
	
	const lotteryModel = new LotteryModel()
	
	export default lotteryModel

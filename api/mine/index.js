import Request from '../../utils/request'
/**
 * @name    MineModel封装
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-07-16 15:43:24
 * @version $Id$
 */

class MineModel extends Request {
	// 订单信息收集
	shopping(params) {
		return this.post('/service/shopping', { ...params, origin: 'Ydui' })
	}
}

const mineModel = new MineModel()

export default mineModel

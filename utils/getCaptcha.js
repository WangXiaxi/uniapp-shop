/**
 * @name    getCaptcha
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-07-17 17:43:24
 * @version $Id$
 */

import {
	url_base,
	url_key,
	url_sign
} from '../common/config'

import md5 from '../common/SDK/md5.min.js'

export const getCaptcha = (name) => {
	const time = new Date().getTime()
	const sign = md5(`${time}${name}${url_key}`)
	return `${url_base}/service/${name}?time=${time}&sign=${sign}`
}
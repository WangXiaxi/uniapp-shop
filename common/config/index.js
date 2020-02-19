/**
 * @name 路径配置 h5本地有配代理，基础路径为空即可
 */
let url_config = ''
let url_base_img = ''
export const versionAnd = '2.1.5'
export const versionIos = '2.1.5'

// #ifdef H5
let origin = window.location.origin
url_config = origin
url_base_img = origin
// #endif

// #ifndef H5
if (process.env.NODE_ENV === 'development') {
	// 开发环境
	url_config = 'http://test.hzyh.ehanone.com'
	url_base_img = 'http://test.hzyh.ehanone.com'
} else {
	// 生产环境
	// url_config = 'http://test.hzyh.ehanone.com'
	url_config = 'http://hzyh.ehanone.com'
	url_base_img = 'http://hzyh.ehanone.com'
}
// #endif

export const url_base = url_config
export const url_key = 'd9777f3ee4f9c8cba60a4536258fec14'
export const url_image = 'https://www.ehanone.com'
export const url_base_image = url_base_img
export const wxAppid = 'wx811be2658ad06045' // 微信appid

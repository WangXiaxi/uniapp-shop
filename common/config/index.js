/**
 * @name 路径配置 h5本地有配代理，基础路径为空即可
 */
let url_config = ''
let url_base_img = ''
export const version = '1.1.0'

// #ifndef H5
if (process.env.NODE_ENV === 'development') {
	// 开发环境
	url_config = 'http://test.hzyh.ehanone.com'
} else {
	// 生产环境
	// url_config = 'http://test.hzyh.ehanone.com'
	url_config = 'http://hzyh.ehanone.com'
}
// #endif

if (process.env.NODE_ENV === 'development') {
	// 开发环境
	url_base_img = 'http://test.hzyh.ehanone.com'
} else {
	// 生产环境
	// url_base_img = 'http://test.hzyh.ehanone.com'
	url_base_img = 'http://hzyh.ehanone.com'
}

export const url_base = url_config
export const url_key = 'd9777f3ee4f9c8cba60a4536258fec14'
export const url_image = 'https://www.ehanone.com'
export const url_base_image = url_base_img
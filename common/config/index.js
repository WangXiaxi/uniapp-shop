/**
 * @name 路径配置 h5本地有配代理，基础路径为空即可
 */
let url_config = ''

// #ifndef H5
if (process.env.NODE_ENV === 'development') {
	// 开发环境
	url_config = 'http://test.hzyh.ehanone.com'
} else {
	// 生产环境
	url_config = 'http://hzyh.ehanone.com'
}
// #endif

export const url_base = url_config
export const url_key = 'd9777f3ee4f9c8cba60a4536258fec14'

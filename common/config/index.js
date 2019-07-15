/**
 * @name 路径配置
 */
let url_config = ''
const url_key = 'd9777f3ee4f9c8cba60a4536258fec14'

// #ifndef H5
if(process.env.NODE_ENV === 'development') {
    // 开发环境
    url_config = 'http://test.hzyh.ehanone.com/service/api/'
}else{
    // 生产环境
    url_config = 'http://hzyh.ehanone.com/service/api/'
}
// #endif

export const url_base = url_config
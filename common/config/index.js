/**
 * @name 路径配置
 */
let url_config = ''

// #ifndef H5
if(process.env.NODE_ENV === 'development') {
    // 开发环境
    url_config = 'http://hzyh.ehanone.com'
}else{
    // 生产环境
    url_config = 'http://hzyh.ehanone.com'
}
// #endif

export const url_base = url_config
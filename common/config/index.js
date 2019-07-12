/**
 * @name 路径配置
 */
let url_config = ''

if(process.env.NODE_ENV === 'development') {
    // 开发环境
    url_config = 'https://*****.com/'
}else{
    // 生产环境
    url_config = 'https://*****.com/'
}

export const url_base = url_config
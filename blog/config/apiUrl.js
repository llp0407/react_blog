
let ipUrl = 'http://127.0.0.1:7001/default/'
// let ipUrl = 'http://1.15.122.234:7001/default/'
// let ipUrl = 'http://118.25.12.124:7001/default/'

let servicePath = {
    getArticleList: `${ipUrl}getArticleList`,  //首页列表
    getArticleById: `${ipUrl}getArticleById`,  //详细
    getTypeInfo: `${ipUrl}getTypeInfo`,
    getListById: `${ipUrl}getListById`
}

export default servicePath
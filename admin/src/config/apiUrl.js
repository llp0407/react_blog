let ipUrl = 'http://127.0.0.1:7001/admin/'
// let ipUrl = 'http://119.29.102.75:7001/admin/'
// let ipUrl = 'http://118.25.12.124:7001/admin/'

let servicePath = {
    checkLogin: `${ipUrl}checkLogin`,     //登录接口
    getTypeInfo: `${ipUrl}getTypeInfo`,   //获取文章类别信息
    addArticle: `${ipUrl}addArticle`,     //添加文章
    updateArticle: `${ipUrl}updateArticle`,  //更新文章
    getArticleList: `${ipUrl}getArticleList`,  //文章列表
    delArticle: `${ipUrl}delArticle`,   //删除文章
    getArticleById: `${ipUrl}getArticleById`,   
}

export default servicePath
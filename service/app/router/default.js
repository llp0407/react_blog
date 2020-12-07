
module.exports = app=>{
    const {router, controller} = app
    router.get('/default/index',controller.default.home.index)
          .get('/default/getArticleList',controller.default.home.getArticleList)
          .get('/default/getArticleById/:id',controller.default.home.getArticleById)
          .get('/default/getTypeInfo',controller.default.home.getTypeInfo)
          .get('/default/getListById/:id',controller.default.home.getListById)
          .get('/default/getArticleById/:id',controller.default.home.getArticleById)
}
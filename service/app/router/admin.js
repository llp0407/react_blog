
module.exports = app=>{
    const {router, controller} = app
    var adminauth = app.middleware.adminauth()
    router.get('/admin/index',adminauth,controller.admin.main.index)
          .post('/admin/checkLogin',controller.admin.main.checkLogin)
          .get('/admin/getTypeInfo',adminauth,controller.admin.main.getTypeInfo)
          .post('/admin/addArticle',controller.admin.main.addArticle)
          .post('/admin/updateArticle',controller.admin.main.updateArticle)
          .get('/admin/getArticleList',controller.admin.main.getArticleList)
          .get('/admin/delArticle/:id',controller.admin.main.delArticle)
          .get('/admin/getArticleById/:id',controller.admin.main.getArticleById)
}
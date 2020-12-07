'use strict'

const { Controller } = require("egg")

class MainController extends Controller{
    async index(){
        this.ctx.body = 'hi api'
    }

    async checkLogin(){
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        console.log(userName,password,444)
        const sql = `SELECT userName FROM admin_user WHERE userName = '${userName}' AND password = '${password}'`
        const results = await this.app.mysql.query(sql)
        if(results.length > 0){
            let openId = new Date().getTime()
            this.ctx.session.openId = openId
            this.ctx.body = {'data':'登录成功','openId':openId,ctx:this.ctx}
        }else{
            this.ctx.body = {'data':'登录失败',userName,password}
        }
    }

    async getTypeInfo(){
        const results = await this.app.mysql.select('type')
        this.ctx.body = {
            data:results
        }
    }

    async addArticle(){
        let tmpArticle = this.ctx.request.body
        const result = await this.app.mysql.insert('article',tmpArticle)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId
        this.ctx.body = {
            isSuccess:insertSuccess,
            insertId,
        }
    }

    async updateArticle(){
        let tmpArticle = this.ctx.request.body
        const result = await this.app.mysql.update('article',tmpArticle)
        const updateSuccess = result.affectedRows === 1
        this.ctx.body = {
            isSuccess:updateSuccess
        }
    }

    async getArticleList(){
        let sql = `SELECT article.id as id,
                      article.title as title,
                      article.introduce as introduce,
                      FROM_UNIXTIME(unix_timestamp(article.addTime),'%Y-%m-%d %H:%i:%s') as addTime,
                      article.view_count as view_count,
                      type.typeName as typeName
                FROM article LEFT JOIN type ON article.type_id = type.id
                ORDER BY article.id DESC`
        const result = await this.app.mysql.query(sql)
        this.ctx.body = {
            list:result
        }
    }

    async delArticle(){
        let id = this.ctx.params.id
        const res = await this.app.mysql.delete('article',{id})
        this.ctx.body = {
            data:res
        }
    }

    async getArticleById(){
        let id = this.ctx.params.id
        let sql = `SELECT article.id as id,
                      article.title as title,
                      article.introduce as introduce,
                      article.article_content as article_content,
                      FROM_UNIXTIME(unix_timestamp(article.addTime),'%Y-%m-%d %H:%i:%s') as addTime,
                      type.typeName as typeName,
                      article.type_id as type_id
                FROM article LEFT JOIN type ON article.type_id = type.id
                WHERE article.id = ${id}`
        const result = await this.app.mysql.query(sql)
        this.ctx.body = {
            data:result
        }
    }
}

module.exports = MainController
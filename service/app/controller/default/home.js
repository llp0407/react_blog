'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'api hi2222';
  }

  async getArticleList(){
    // "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s')" as addTime,
    const { ctx } = this;
    let sql = `SELECT article.id as id,
                      article.title as title,
                      article.introduce as introduce,
                      FROM_UNIXTIME(unix_timestamp(article.addTime),'%Y-%m-%d %H:%i:%s') as addTime,
                      article.view_count as view_count,
                      type.typeName as typeName
                FROM article LEFT JOIN type ON article.type_id = type.id`

    const results = await this.app.mysql.query(sql)
    console.log(888)
    // console.log('results',results)
    ctx.body = {
      data:results
    }
  }

  async getArticleById(){
    const { ctx } = this;
    let id = ctx.params.id
    let sql = `SELECT article.id as id,
                      article.title as title,
                      article.introduce as introduce,
                      FROM_UNIXTIME(unix_timestamp(article.addTime),'%Y-%m-%d %H:%i:%s') as addTime,
                      article.view_count as view_count,
                      article.article_content as article_content,
                      type.typeName as typeName,
                      type.id as typeId
                FROM article LEFT JOIN type ON article.type_id = type.id
                WHERE article.id = ${id}`
    const results = await this.app.mysql.query(sql)
    // console.log(456)
    ctx.body = {
      data:results
    }
  }


  //得到类别名称和编号
  async getTypeInfo(){
    const result = await this.app.mysql.select('type')
    this.ctx.body = {
      data:result
    }
  }

  //根据类别id获取文章列表
  async getListById(){
    let id = this.ctx.params.id
    let sql = `SELECT article.id as id,
                      article.title as title,
                      article.introduce as introduce,
                      FROM_UNIXTIME(unix_timestamp(article.addTime),'%Y-%m-%d %H:%i:%s') as addTime,
                      article.view_count as view_count,
                      type.typeName as typeName
                FROM article LEFT JOIN type ON article.type_id = type.id
                WHERE type_id = ${id}`
    const results = await this.app.mysql.query(sql)
    this.ctx.body = {
      data:results
    }
  }
}

module.exports = HomeController;

// RESTful APP 前后端分离，简单，约束性
// 请求方式 get post put delete
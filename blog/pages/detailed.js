import React from 'react'
import Head from 'next/head'
import {Row, Col,Breadcrumb, Affix,} from 'antd'
import { FireOutlined,FolderOutlined,FieldTimeOutlined } from '@ant-design/icons';
import axios from 'axios'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem'
// import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'

import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'

import servicePath from '../config/apiUrl'
import '../static/style/pages/detailed.css'

const Detailed = (props) => {
  const tocify = new Tocify()
  const renderer = new marked.Renderer()

  renderer.heading = function(text,level,raw){
    const anchor = tocify.add(text,level)
    return `<a id=${anchor} href="#${anchor}" class="anchor-fix">
              <h${level}>${text}</h${level}>
            </a>\n`
  }

  marked.setOptions({
    renderer,
    gfm:true,   //css相关
    pedantic:false,   //严格模式
    sanitize:false,   //忽略html
    tables:true,     
    breaks:false,    //换行符
    smartLists:true,    
    highlight:function(code){
      return hljs.highlightAuto(code).value
    }
  })

  let html = marked(props.article_content)

  return (
    <div>
      <Head>
        <title>{props.title}</title>
      </Head>
  
      <Header></Header>
  
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
                <Breadcrumb>
                  <BreadcrumbItem>
                    <a href='/'>首页</a>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <a href='/'>视频列表</a>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <a href='/'>{props.title}</a>
                  </BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div>
              <div className="detailed-title">
                {props.title}
              </div>
              <div className="list-icon center">
                <span><FieldTimeOutlined />{props.addTime}</span>
                <span><FolderOutlined />{props.typeName}</span>
                <span><FireOutlined />{props.view_count}</span>
              </div>
              <div className="detailed-content"
                dangerouslySetInnerHTML={{__html:html}}
              >
              </div>
            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author></Author>
          <Advert></Advert>
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              {tocify && tocify.render()}
              {/* <MarkNav
                className="article-menu"
                source={html}
                // headingTopOffset={0}
                ordered={false}
                /> */}
            </div>
          </Affix>
        </Col>
      </Row>
  
      <Footer></Footer>
    </div>
  )
}
Detailed.getInitialProps = async (context)=>{
  console.log(context.query.id)
  let id = context.query.id

  const promise = new Promise(resolve=>{
    axios(`${servicePath.getArticleById}/${id}`)
      .then(res=>{
        console.log('getArticleById',res)
        resolve(res.data.data[0])
      })
  })

  return await promise
}

export default Detailed

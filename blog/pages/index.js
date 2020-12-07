import React, { useState } from 'react'
import Head from 'next/head'
import { Row, Col } from 'antd'
import axios from 'axios'
import Header from '../components/Header'
import Author from '../components/Author'
import '../static/style/pages/index.css'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import ListComponent from '../components/ListComponent'

import servicePath from '../config/apiUrl'

const Home = (list) => {
  // const renderMethod = module.hot?ReactDom.render:ReactDom.hydrate
  const [ mylist , setMylist ] = useState(list.data)
  
  return (
    <div>
      <Head>
        <title>llp个人博客</title>
        <link rel="shortcut icon" href="../static/favicon.ico" />
      </Head>

      <Header></Header>

      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <ListComponent
            mylist={mylist}
            >
          </ListComponent>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author/>
          <Advert/>
        </Col>
      </Row>

      <Footer></Footer>
    </div>
  )
}

Home.getInitialProps = async ()=>{
  // console.log('start')
  
  const promise = new Promise((resolve)=>{
    axios.get(servicePath.getArticleList)
      .then((res)=>{
        // console.log('getArticleList',res)
        resolve(res.data)
      })
  })
  return await promise
}

export default Home

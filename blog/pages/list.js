import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Row, Col,Breadcrumb } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import ListComponent from '../components/ListComponent'

import servicePath from '../config/apiUrl'
import axios from 'axios'

const MyList = (list) => {
  const [ mylist , setMylist ] = useState(list.data)
  useEffect(()=>{
    setMylist(list.data)
  })
  // console.log(list)
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <Header></Header>

      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>

          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href='/'>首页</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                {list.url.query.id==1&&'视频教程'||list.url.query.id==2&&'生活'}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>

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

MyList.getInitialProps = async (context)=>{
  console.log('context',context)
  let id = context.query.id
  const promise = new Promise((resolve)=>{
    axios.get(`${servicePath.getListById}/${id}`)
      .then((res)=>{
        console.log('getListById',res)
        resolve(res.data)
      })
  })
  return await promise
}

export default MyList

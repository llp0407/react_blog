import React, { useState,useEffect } from 'react'
import '../static/style/components/header.css'
import {Row,Col,Menu} from 'antd'
import { HomeOutlined,VideoCameraOutlined,SmileOutlined } from '@ant-design/icons';
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'


const Header = ()=>{

    const [navArray,setNavArray] = useState([])
    useEffect(()=>{
        const fetchData = async ()=>{
            const result = await axios.get(servicePath.getTypeInfo)
                .then(res=>{
                    return res.data.data
                })
            setNavArray(result)
        }
        fetchData()
        // return ()=>{
        //     console.log('卸载')
        // }
    },[])

    const handleClick = (e)=>{
        console.log(e)
        if(e.key == 0){
            Router.push('/')
        }else{
            Router.push(`/list?id=${e.key}`)
        }
    }

    return (
        <div className="header">
            <Row tpye="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                    <span className="header-logo">llp</span>
                    <span className="header-txt">一个前端</span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="0">
                            <HomeOutlined />
                            首页
                        </Menu.Item>
                        {navArray.map((item,idx)=>{
                            return (
                                <Menu.Item key={idx+1}>
                                    {idx==0?<VideoCameraOutlined />:<SmileOutlined />}
                                    {item.typeName}
                                </Menu.Item>
                            )
                        })}
                        {/* <Menu.Item key="1">
                            <VideoCameraOutlined />
                            {navArray[0].typeName}
                        </Menu.Item>
                        <Menu.Item key="2">
                            <SmileOutlined />
                            {navArray[1].typeName}
                        </Menu.Item> */}
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

// Header.getInitialProps

export default Header
import React, { useState,useEffect } from 'react'
import {List,Row,Col,Modal,message,Button} from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import '../static/css/ArticleList.css'
const {confirm} = Modal

function ArticleList(props){
    const [list,setList] = useState([])

    useEffect(()=>{
        getArticleList()
    },[])

    const getArticleList = ()=>{
        axios({
            method:'get',
            url:servicePath.getArticleList,
        }).then((res)=>{
            setList(res.data.list)
        })
    }

    const delArticle = (id)=>{
        confirm({
            title:'提示框',
            content:'确定要删除吗？',
            onOk:()=>{
                axios(`${servicePath.delArticle}/${id}`).then((res)=>{
                    message.success('删除成功')
                    getArticleList()
                })
            },
            onCancel:()=>{
                message.success('取消')
            }
        })
    }

    const updateArticle = (id,checked) => {
        props.history.push(`/index/add/${id}`)
    }

    return (
        <div>
            <List
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={4}>
                            <b>类别</b>
                        </Col>
                        <Col span={4}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={4}>
                            <b>浏览量</b>
                        </Col>
                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem={
                    (item)=>{
                        return (
                            <List.Item>
                                <Row className="list-div">
                                    <Col span={8}>
                                        {item.title}
                                    </Col>
                                    <Col span={4}>
                                        {item.typeName}
                                    </Col>
                                    <Col span={4}>
                                        {item.addTime}
                                    </Col>
                                    <Col span={4}>
                                        {item.view_count}
                                    </Col>
                                    <Col span={4}>
                                        <Button type="primary" onClick={
                                            ()=>{
                                                updateArticle(item.id)
                                            }
                                        }>修改</Button>
                                        &nbsp;
                                        <Button onClick={()=>{delArticle(item.id)}}>删除</Button>
                                    </Col>
                                </Row>
                            </List.Item>
                        )
                    }
                }
            >
            </List>
        </div>
    )
}

export default ArticleList

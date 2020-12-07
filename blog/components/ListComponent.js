import React, { useState } from 'react'
import Link from 'next/link'
import { List,Spin } from 'antd'
import { FireOutlined,FolderOutlined,FieldTimeOutlined } from '@ant-design/icons';
import '../static/style/pages/index.css'


import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'


const ListComponent = (props) => {
//   console.log('ListComponent 参数',props)

  const renderer = new marked.Renderer()
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
  });

  const [ loading , setLoading ] = useState(false)
  const startLoading = ()=>{
    setLoading(true)
  }

  return (
    <div>
        <List 
        header={<div>最新日志</div>}
        itemLayout="vertical"
        dataSource={props.mylist}
        renderItem={item=>{
            return (
            <List.Item>
              <Spin spinning={loading}>
                <div className="list-title">
                  <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                      <a onClick={startLoading}>{item.title}</a>
                  </Link>
                  </div>
                  <div className="list-icon">
                  <span><FieldTimeOutlined />{item.addTime}</span>
                  <span><FolderOutlined />{item.typeName}</span>
                  <span><FireOutlined />{item.view_count}人</span>
                  </div>
                  <div className="list-context"
                      dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                  >
                </div>
              </Spin>
            </List.Item>
            )
        }}
        />
    </div>
  )
}

export default ListComponent

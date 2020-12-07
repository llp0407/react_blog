import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { Card,Input,Button,Spin,message } from 'antd'
import '../static/css/Login.css'
import { UserOutlined, KeyOutlined} from '@ant-design/icons';

import servicePath from '../config/apiUrl'
import axios from 'axios'

function Login(props){

    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [isLoading,setIsLoading] = useState(false)

    const checkLogin = ()=>{
        if(!userName){
            message.error('用户名不能为空')
            return false
        }else if(!password){
            message.error('密码不能为空')
            return false
        }
        setIsLoading(true)
        let obj = {
            userName,
            password
        }
        axios({
            method:'post',
            url:servicePath.checkLogin,
            data:obj,
        }).then((res)=>{
                console.log('checkLogin',res)
                setIsLoading(false)
                if(res.data.data === '登录成功'){
                    localStorage.setItem('openId',res.data.openId)
                    props.history.push('/index')
                }
                else{
                    message.error('用户名密码错误')
                }
            })
    }

    return (
        <div className="login-div">
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="LLP Blog System" bordered={true} style={{width:400}}>
                    <Input 
                        id="userName"
                        size="large" 
                        placeholder="Enter your userName"
                        prefix={<UserOutlined />}
                        onChange={(e)=>{
                            setUserName(e.target.value)
                        }}
                    >
                    </Input>
                    <br/><br/>
                    <Input.Password 
                        id="password"
                        size="large" 
                        placeholder="Enter your password"
                        prefix={<KeyOutlined />}
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                    >
                    </Input.Password>
                    <br/><br/>

                    <Button type="primary" size="large" block onClick={checkLogin}>Login in</Button>
                </Card>
            </Spin>
        </div>
    )
}

export default Login
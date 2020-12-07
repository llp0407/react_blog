import {Divider, Avatar} from 'antd'
import '../static/style/components/author.css'
import { GithubOutlined,QqOutlined,WechatOutlined,WechatFilled } from '@ant-design/icons';

const Author = ()=>{
    return (
        <div className="author-div comm-box">
            <div className="avatar-box">
                <Avatar size={100} src="../static/img/avatar.jpg"></Avatar>
            </div>
            <div className="author-introduction">
                简介
                <Divider>社交账号</Divider>
                <GithubOutlined style={{ fontSize: '28px' }} className="account"/>
                <QqOutlined style={{ fontSize: '28px' }} className="account"/>
                {/* <WechatOutlined style={{ fontSize: '28px' }} className="account"/> */}
                <WechatFilled style={{ fontSize: '28px' }} className="account"/>
                {/* <Avatar size={28} icon="github" className="account"></Avatar>
                <Avatar size={28} icon="qq" className="account"></Avatar>
                <Avatar size={28} icon="wechat" className="account"></Avatar> */}
            </div>
        </div>
    )
}

export default Author
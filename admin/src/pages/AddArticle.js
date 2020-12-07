import React,{useState,useEffect} from 'react'
import marked from 'marked'
import '../static/css/AddArticle.css'
import {Row,Col,Input,Select,Button,DatePicker, message} from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const {Option} = Select
const {TextArea} = Input

function AddArticle(props){
   
    const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('')   //文章标题
    const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate,setShowDate] = useState()   //发布日期
    const [updateDate,setUpdateDate] = useState() //修改日志的日期
    const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType,setSelectType] = useState('请选择文章类型') //选择的文章类别

    marked.setOptions({
        renderer:marked.renderer,
        gfm:true,
        pedantic:false,
        sanitize:false,
        tables:true,
        breaks:false,
        smartLists:true,
        smartypants:false
    })

    useEffect(()=>{
        getTypeInfo().then(res=>{
            let tmpId = props.match.params.id
            if(tmpId){
                setArticleId(tmpId)
                getArticleById(tmpId)
            }
        })
        // console.log('add',props)
    },[])

    

    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }

    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }

    const getTypeInfo = () => {
        return new Promise((resolve,reject)=>{
            axios({
                method:'get',
                url:servicePath.getTypeInfo,
                // withCredentials:true
            }).then((res)=>{
                console.log('getTypeInfo',res)
                if(res.data.data == '没有登录'){
                    // localStorage.removeItem('openId')
                    props.history.push('/')
                }else{
                    setTypeInfo(res.data.data)
                }
                resolve(1)
            })
        })
    }

    const selectTypeHandler = (value) => {
        console.log(value)
        setSelectType(value)
    }

    const saveArticle = ()=>{
        if(selectedType == '请选择文章类型'){
            message.error('必须选择文章类型')
            return false
        }
        if(!articleTitle){
            message.error('必须填写标题')
            return false
        }
        if(!articleContent){
            message.error('必须填写内容')
            return false
        }
        if(!introducemd){
            message.error('文章简介不能为空')
            return false
        }
        // if(!showDate){
        //     message.error('发布日期不能为空')
        //     return false
        // }
        let obj = {
            type_id:selectedType,
            title:articleTitle,
            article_content:articleContent,
            introduce:introducemd,
            // addTime:
        }
        if(articleId == 0){
            obj.view_count = 0
            // console.log(obj)
            axios({
                method:'post',
                url:servicePath.addArticle,
                data:obj
            }).then((res)=>{
                setArticleId(res.data.insertId)
                if(res.data.isSuccess){
                    message.success('文章保存成功')
                }else{
                    message.error('保存失败')
                }
            })
        }else{
            obj.id = articleId
            // console.log(obj)
            axios({
                method:'post',
                url:servicePath.updateArticle,
                data:obj
            }).then((res)=>{
                if(res.data.isSuccess){
                    message.success('文章更新成功')
                }else{
                    message.error('保存失败')
                }
            })
        }
    }

    const getArticleById = (id)=>{
        axios(`${servicePath.getArticleById}/${id}`)
            .then((res)=>{
                console.log('getArticleById',res)
                let articleInfo = res.data.data[0]
                setArticleTitle(articleInfo.title)
                setArticleContent(articleInfo.article_content)
                let html = marked(articleInfo.article_content)
                setMarkdownContent(html)
                setIntroducemd(articleInfo.introduce)
                let tmpInt = marked(articleInfo.introduce)
                setIntroducehtml(tmpInt)
                setShowDate(articleInfo.addTime)
                setSelectType(parseInt(articleInfo.type_id))
                // setSelectType(articleInfo.typeName)
            })
    }

    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input
                                value={articleTitle}
                                placeholder="博客标题"
                                size="large"
                                onChange={e=>{setArticleTitle(e.target.value)}}
                            >
                            </Input>
                        </Col>
                        <Col span={4}>
                            &nbsp;
                            <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler} value={selectedType}>
                                {
                                    typeInfo.map((item,idx)=>{
                                        return (
                                            <Option key={idx} value={item.id}>{item.typeName}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <br/>
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea
                                className="markdown-content"
                                rows={35}
                                placeholder="文章内容"
                                value={articleContent}
                                onChange={changeContent}
                            >
                            </TextArea>
                        </Col>
                        <Col span={12}>
                            <div className="show-html"
                                dangerouslySetInnerHTML={{__html:markdownContent}}
                            >
                            </div>
                        </Col>
                    </Row>  
                </Col>

                <Col span={6}>
                    <Row>
                        <Col span='24'>
                            <Button size="large">暂存文章</Button>&nbsp;
                            <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                            <br/>
                        </Col>
                        <Col span='24'>
                            <br/>
                            <TextArea
                                rows={4}
                                placeholder="文章简介"
                                onChange={changeIntroduce}
                                value={introducemd}
                            ></TextArea>
                            <br/><br/>
                            <div className="introduce-html"
                                dangerouslySetInnerHTML={{__html:introducehtml}}
                            >
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    placeholder="发布日期"
                                    size="large"
                                    onChange={(date,dateString)=>{
                                        return setShowDate(dateString)
                                    }}
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}



export default AddArticle
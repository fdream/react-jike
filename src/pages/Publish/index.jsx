import {Card,Breadcrumb,Form,Button,Radio,Input,Upload,Space,Select} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { message } from 'antd'
import './index.scss'
// 导入富文本编辑器
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { useState } from 'react'
import { publishArticleAPI, getArticleDetailAPI, updateArticleAPI } from '@/apis/article'
import { useChannel } from '@/hooks/useChannel'
import { useSearchParams,useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


const { Option } = Select
const Publish = () => {
    const navigate = useNavigate()
    // 获取渠道列表
    const channelList = useChannel()

    // 发布/更新文章-提交表单
    const onFinish = async (formData) => {
        //校验图片类型按钮与实际上传的图片数量是否一致
        if(imageType !== imageList.length) return message.error('请上传正确的图片数量')
        const { title, content, channel_id} = formData
        const reqData={
            title,
            content,
            cover:{
                type:imageType,     //上传数量要求
                images: imageList.map(item => item.response ? item.response.data.url : item.url)
            },
            channel_id,
        }
        if(articleId){
            await updateArticleAPI({...reqData,id:articleId})//解构补参
            navigate('/article')
        }else{
            await  publishArticleAPI(reqData)
        }
            message.success('发布成功')
    }

    // 获取上传组件的上传文件
    const [imageList, setImageList] = useState([])
    const onChange = (value) => { //🎈不要提前遍历，遍历后没有UID,无法渲染到上传组件中回显
        setImageList(value.fileList)
        console.log("上传组件内的上传文件数据")
        console.log("value:", value)
        console.log("file文件信息:", value.file)
        console.log("fileList文件列表:", value.fileList)
        console.log("图片列表:状态变量异步更新只能打印旧值",
            imageList.map(item => item.response ? item.response.data.url : item.url))
    }

    // 依据封面选项改变，控制上传按钮显隐
    const [imageType, setImageType] = useState(0)
    const onChangeByType = (value) => {
        setImageType(value.target.value)
    }

    // 编辑文章时，获取文章详情回显
    const [searchParams, setSearchParams] = useSearchParams()//获取路由参数
    const articleId = searchParams.get('id')
    const [form] = Form.useForm()//获取表单实例
    useEffect(() => {
        async function getArticleDetail(){
            const res=await getArticleDetailAPI(articleId)
            form.setFieldsValue({//封装技巧const data = res.data const {cover} = data
                ...res.data,                //...data
                type: res.data.cover.type  //①回填单选type:cover.type 
            })
            setImageType(res.data.cover.type)//②回填上传框cover.type
            setImageList(res.data.cover.images.map(item => ({url:item})))//③回显原文件
        }
        if(articleId){
            getArticleDetail()//JS看到就执行
        }
    }, [articleId,form])



    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: articleId ? '编辑文章' : '发布文章'},
                        // { title: `${articleId ? '编辑' : '发布'}文章`},
                    ]}/>
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: imageType }}//控制整个表单各项初始值
                    onFinish={onFinish} //点击提交按钮，自动提交表单数据
                    form={form}
                >
                    <Form.Item
                        label="标题"
                        name="title" //name 与 formData 中的 key 保持一致
                        rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道' }]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                            {channelList.map(item => (
                                <Option key={item.id} value={item.id}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={onChangeByType}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {/* 文件上传没有Item的name了,需要单独设置 */}
                        {imageType !== 0 && ( // 根据封面单选，有封面时才显示上传按钮
                        <Upload
                            listType="picture-card" //外观样式
                            showUploadList   //是否显示上传列表
                            action={'http://geek.itheima.net/v1_0/upload'}//上传接口
                            name='image'  //上传文件的名称
                            onChange={onChange} //上传文件数据
                            maxCount={imageType}
                            fileList={imageList}//编辑时回显
                        >
                            <div style={{ marginTop: 8 }}>
                                <PlusOutlined />
                            </div>
                        </Upload>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容' }]}
                    >
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="请输入文章内容"
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish
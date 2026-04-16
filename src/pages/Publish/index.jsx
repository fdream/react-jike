import {Card,Breadcrumb,Form,Button,Radio,Input,Upload,Space,Select} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { message } from 'antd'
import './index.scss'
// 导入富文本编辑器
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { useState } from 'react'
import { publishArticleAPI } from '@/apis/article'
import { useChannel } from '@/hooks/useChannel'

const { Option } = Select
const Publish = () => {
    const channelList = useChannel()

    // 处理表单提交
    const onFinish = async (formData) => {
        //校验图片类型按钮与实际上传的图片数量是否一致
        if(imageType !== imageList.length) return message.error('请上传正确的图片数量')
        const { title, content, channel_id} = formData
        const reqData={
            title,
            content,
            cover:{
                type:imageType,//上传数量要求
                images:imageList.map(item => item.response.data.url)//上传格式要求，提取url
            },
            channel_id,
        }
        console.log('提交表单值:', reqData)
        publishArticleAPI(reqData)
        message.success('发布成功')
    }

    // 获取上传组件的上传文件
    const [imageList, setImageList] = useState([])
    const onChange = (value) => {
        console.log("上传组件内的上传文件数据" //file：文件信息 fileList：文件列表
            ,value
            ,value.file
            ,value.fileList
            ,value.fileList.map(item => item.response.data.url)
        )
        setImageList(value.fileList)
    }

    // 封面数量改变，控制上传图片按钮显隐
    const [imageType, setImageType] = useState(0)
    const onChangeByType = (value) => {
        setImageType(value.target.value)
    }



    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: '发布文章' },
                    ]}/>
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: imageType }}//控制整个表单各项初始值
                    onFinish={onFinish}//点击提交按钮，自动提交表单数据
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
                        {/* 文件上传没有Item的name了 */}
                        {imageType !== 0 && ( // 根据封面单选，有封面时才显示上传按钮
                        <Upload
                            listType="picture-card" //外观样式
                            showUploadList   //是否显示上传列表
                            action={'http://geek.itheima.net/v1_0/upload'}//上传接口
                            name='image'  //上传文件的名称
                            onChange={onChange}
                            maxCount={imageType}
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
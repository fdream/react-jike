import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
// 引入日期选择器的中文显示
// import locale from 'antd/es/date-picker/locale/zh_CN'
// 导入资源
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useChannel } from '@/hooks/useChannel'
import { getArticleListAPI } from '@/apis/article'
import { useEffect, useState } from 'react'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
    //频道列表数据
    const channelList = useChannel()

    //文章状态枚举数据  两个：三元短路与  多个：用枚举
    const articleStatusEnum = {
        1: <Tag color="warning">待审核</Tag>,
        2: <Tag color="success">审核通过</Tag>,
        // 3: <Tag color="danger">审核不通过</Tag>,
        // 4: <Tag color="default">草稿</Tag>,
    }

    // 准备列数据
    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: data => articleStatusEnum[data] //文章状态显示
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined />} />
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                        />
                    </Space>
                )
            }
        }
    ]
    // 准备表格body数据
    const data = [
        {
            id: '8218',
            comment_count: 0,
            cover: {
                images: [],
            },
            like_count: 0,
            pubdate: '2019-03-11 09:00:00',
            read_count: 2,
            status: 2,
            title: 'wkwebview离线化加载h5资源解决方案'
        }
    ]

    //请求参数  TODO 显式瞅瞅可省略吧
    const [reqParams, setReqParams] = useState({
        status: '',       //文章状态
        channel_id: '',   //频道id
        begin_pubdate: '', //开始时间
        end_pubdate: '', //结束时间
        page: 1,        //页码
        per_page: 10,   //每页条数
    })

    //1.初试获取文章列表数据
    const [articleList, setArticleList] = useState([])
    //文章总条数
    const [count, setCount] = useState(0)
    useEffect(() => {
        async function getArticleList() {
        // const getArticleList = async () => {
            const res = await getArticleListAPI(reqParams)
            setArticleList(res.data.results)
            setCount(res.data.total_count)
        }
        getArticleList()
    }, [reqParams])

    //2.条件筛选获取文章列表数据
    const onFinish = (formData) => {
        console.log('formData:', +formData.date)
        setReqParams({
            ...reqParams,
            channel_id: formData.channel_id,
            status: formData.status,
            begin_pubdate: formData.date[0].format('YYYY-MM-DD'),
            end_pubdate: formData.date[1].format('YYYY-MM-DD')
        })
        //获取文章列表数据,触发useEffect
    }

    //分页改变
    const onPageChange = (page) => {
        setReqParams({ 
            ...reqParams, 
            page
        })
    }


    return (
        <div>
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: '文章列表' },
                    ]} />
                }
                style={{ marginBottom: 20 }}
            >
                < Form initialValues={{ status: '' }} onFinish={onFinish}>
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={''}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={2}>审核通过</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channel_id">
                        <Select
                            placeholder="请选择文章频道"
                            defaultValue="lucy"
                            style={{ width: 120 }}
                        >
                            {channelList.map(item => (
                                <Option key={item.id} value={item.id}> {item.name} </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="日期" name="date">
                        {/* 传入locale属性 控制中文显示*/}
                        {/* <RangePicker locale={}></RangePicker> */}
                        <RangePicker></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            {/* 表格数据,默认第一页数据 */}
            <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
                <Table rowKey="id" columns={columns} dataSource={articleList} pagination={{
                    total: count, //总条数
                    pageSize: reqParams.per_page, //每页条数
                    onChange: onPageChange //分页改变
                }}/>
            </Card>
        </div>
    )
}

export default Article
import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm, message } from 'antd'
// 引入日期选择器的中文显示
// import locale from 'antd/es/date-picker/locale/zh_CN'
// 导入资源
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useChannel } from '@/hooks/useChannel'
import { getArticleListAPI ,delArticleAPI} from '@/apis/article'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
    //频道列表数据hook
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
                        <Button type="primary" shape="circle" icon={<EditOutlined />} 
                        onClick={() => navigate(`/publish/?id=${data.id}`)} />//Query传参数
                        <Popconfirm
                            title="确认删除该条文章吗?"
                            description="我是具体描述"
                            onConfirm={() => ondelArticle(data)}
                            okText="确认"
                            cancelText="取消"
                            >
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                        />
                        </Popconfirm>
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

    //封装请求参数状态变量  TODO 显式瞅瞅可省略吧
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

    //2.函数级组件获取文章列表数据
    const getArticleList = async () => {
        const res = await getArticleListAPI(reqParams)
        setArticleList(res.data.results)
        setCount(res.data.total_count)
    }
    //3.副作用管理
    useEffect(() => {
        getArticleList()
    }, [reqParams])

    //4..条件筛选获取文章列表数据
    const onFinish = (formData) => {
        console.log('formData:', +formData.date)
        setReqParams({
            ...reqParams,
            channel_id: formData.channel_id,
            status: formData.status,
            begin_pubdate: formData.date[0].format('YYYY-MM-DD'),
            end_pubdate: formData.date[1].format('YYYY-MM-DD')
        })
        //触发useEffect
    }

    //5.分页改变
    const onPageChange = (page) => {
        setReqParams({
            ...reqParams,
            page
        })
        //触发useEffect
    }

    //6.删除文章
    const ondelArticle = async (data)=>{
        await delArticleAPI(data.id)//async声明异步函数 await等待删除接口返回后再执行后续代码
        getArticleList()            //手动调用
        message.success('删除成功')
    }

    //
    const navigate = useNavigate()
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
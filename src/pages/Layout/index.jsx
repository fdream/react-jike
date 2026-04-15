import { Layout, Menu, Popconfirm } from 'antd'
import { Outlet } from 'react-router-dom'
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserInfo, clearUserInfo } from '@/store/models/user'

const { Header, Sider } = Layout

const items = [
    {
        label: '首页',
        key: '/home',
        icon: <HomeOutlined />,
    },
    {
        label: '文章管理',
        key: '/article',
        icon: <DiffOutlined />,
    },
    {
        label: '创建文章',
        key: '/publish',
        icon: <EditOutlined />,
    },
]

const GeekLayout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //点击导航栏跳转二级路由功能
    const onMenuClick = (value) => {
        console.log(value)
        navigate(value.key)
    }

    //点击才高亮➡️根据当前页面高亮功能
    const location = useLocation()
    const selectedKeys = location.pathname
    
    //自动获取用户信息显式action
    useEffect(() => {
        dispatch(fetchUserInfo())
    }, [dispatch])
    const username=useSelector((state)=>state.user.userInfo.name)

    //退出登录功能
    const logout = () => {
        dispatch(clearUserInfo())
        navigate('/login')
    }
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <div className="user-info">
                    <span className="user-name">{username}</span>
                    <span className="user-logout">
                        <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={logout}>
                            <LogoutOutlined /> 退出
                        </Popconfirm>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="light"
                        defaultSelectedKeys={[selectedKeys]}//高亮当前路由
                        items={items}
                        style={{ height: '100%', borderRight: 0 }}
                        onClick={onMenuClick}//点击导航栏跳转二级路由
                    ></Menu>
                </Sider>
                <Layout className="layout-content" style={{ padding: 20 }}>
                    {/* 二级路由出口，用于渲染子路由组件 */}
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
    )
}
export default GeekLayout
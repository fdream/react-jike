//登录页
import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/logo.png'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchLogin } from '@/store/models/user'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = async (values) => {
        await dispatch(fetchLogin(values))
        navigate('/Home')
        message.success('登录成功,即将跳转首页...')
    }

    return (
        <div className="login">
            <div className="login-inner">
                <div className="login-hero">
                    <div className="hero-badge">你好，这里是极乐园 👋</div>
                    <h1 className="hero-title">My Personal Tech Blog</h1>
                    <p className="hero-subtitle">一起探索技术的奥秘，共同进步</p>

                    <div className="hero-tiles">
                        <div className="hero-tile">
                            <span className="tile-icon">📝</span>
                            <span className="tile-text">文章管理</span>
                        </div>
                        <div className="hero-tile">
                            <span className="tile-icon">📣</span>
                            <span className="tile-text">数据可视化</span>
                        </div>
                        <div className="hero-tile">
                            <span className="tile-icon">✍️</span>
                            <span className="tile-text">发布内容</span>
                        </div>
                    </div>
                </div>

                <Card className="login-container">
                    <img className="login-logo" src={logo} alt="" />
                    {/* 登录表单 */}
                    <Form onFinish={onFinish} validateTrigger="onBlur">
                        <Form.Item
                            name="mobile"
                            rules={[
                                { required: true, message: '请输入手机号' },
                                { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
                            ]}
                        >
                            <Input size="large" placeholder="请输入手机号" />
                        </Form.Item>
                        <Form.Item
                            name="code"
                            rules={[{ required: true, message: '请输入验证码' }]}
                        >
                            <Input size="large" placeholder="请输入验证码" maxLength={6} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" size="large" block>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    )
}

export default Login

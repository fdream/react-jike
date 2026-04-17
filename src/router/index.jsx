//路由配置
import { createBrowserRouter } from 'react-router-dom';
import Login from '@/pages/Login';
import Layout from '@/pages/Layout';
import { AuthRoute } from '@/components/AuthRoute';
// import Home from '@/pages/Home';
// import Article from '@/pages/Article';
// import Publish from '@/pages/Publish';
import { Navigate } from 'react-router-dom';
//路由懒加载方式
const Home = lazy(() => import('@/pages/Home'));
const Article = lazy(() => import('@/pages/Article'));
const Publish = lazy(() => import('@/pages/Publish'));


const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/login" />,//好像没有重定向redirect
    },
    {
        path: '/login',
        element:  <Login />
    },
    {
        path: '/layout',
        // element: <AuthRoute> <Layout /> </AuthRoute>,
        element: <Layout />,
        children: [
            {
                path: 'home',  //子路由的父路由为空，就要加/
                element: <Suspense fallback={'首页中...'}> <Home /> </Suspense>,
            },
            {
                path: 'article',
                element: <Suspense fallback={'文章列表中...'}> <Article /> </Suspense>,
            },
            {
                path: 'publish',
                element: <Suspense fallback={'发布中...'}> <Publish /> </Suspense>,
            },
        ]
    },

]);
export default router;

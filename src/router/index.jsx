//路由配置
import { createBrowserRouter } from 'react-router-dom';
import Login from '@/pages/Login';
import Layout from '@/pages/Layout';
import { AuthRoute } from '@/components/AuthRoute';
import Home from '@/pages/Home';
import Article from '@/pages/Article';
import Publish from '@/pages/Publish';
import { Navigate } from 'react-router-dom';



const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/login" />,//好像没有重定向redirect
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/layout',
        // element: <AuthRoute> <Layout /> </AuthRoute>,
        element: <Layout />,
        children: [
            {
                path: 'home',  //子路由的父路由非空，就要加/
                element: <Home />,
            },
            {
                path: 'article',
                element: <Article />,
            },
            {
                path: 'publish',
                element: <Publish />,
            },
        ]
    },

]);
export default router;

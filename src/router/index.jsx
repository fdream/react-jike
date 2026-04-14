//路由配置
import { createBrowserRouter } from 'react-router-dom';
import Login from '@/pages/Login';
import Layout from '@/pages/Layout';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/layout',
        element: <Layout />,
    },

]);
export default router;

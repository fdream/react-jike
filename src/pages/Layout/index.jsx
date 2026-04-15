import { request } from '@/utils'
import { useEffect } from 'react';


const Layout = () => {
    useEffect(() => {
        request.get('/user/profile')
    }, [])
    return 'this is Layout component'
}

export default Layout;
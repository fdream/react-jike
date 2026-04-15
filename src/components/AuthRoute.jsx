//token有无权限判断
import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'



export const AuthRoute = ({ children }) => {
    const token = getToken()
    if (token) {
        return <>{children}</>
    }
    return <Navigate to="/login" replace />
}
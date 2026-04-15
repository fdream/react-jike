//用户相关接口
import { request } from '@/utils';

//登录接口
export function loginAPI(formData) {
    return request({
        url: '/authorization',
        method: 'POST',
        data:formData,
    })
}

//获取用户信息接口
export function getUserInfoAPI() {
    return request({
        url: '/user/profile',
        method: 'GET',
    })
}

//用户相关的状态管理  三步走
import { createSlice } from '@reduxjs/toolkit'
import {request, getToken, setToken , removeToken} from '@/utils'
import { loginAPI, getUserInfoAPI } from '@/apis/user'

const userStore = createSlice({
    name: 'user',
    initialState: {
        token: getToken() || '', //从获取token
        userInfo: {}
    },
    //同步修改方法
    reducers: {
        //🦖保存token信息 ps：本项目toekn与userInfo是分开存储的
        setTokenInfo(state, action) {
            state.token = action.payload//1.存到redux状态中
            setToken(action.payload)//2.存到localStorage中
        },
        //🦖保存用户信息
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        //清除用户信息
        clearUserInfo(state, action) {
            state.token = ''
            state.userInfo = {}
            removeToken()
        }
    }
})

// 1.解构出同步修改方法给异步用  2.导出部分方法给外面用
export const { setTokenInfo, setUserInfo, clearUserInfo } = userStore.actions
export default userStore.reducer
// 替换成上面const userReducer = userStore.reducer

// export { setTokenInfo, setUserInfo }
// export default userReducer

//🦖封装异步登录方法
export const fetchLogin = (loginForm) => {
    return async (dispatch) => {  //传入dispatch函数 return可省略
        const res = await loginAPI(loginForm)//改造： const res = await request.post('/authorizations', loginForm)
        dispatch(setTokenInfo(res.data.token))
    }
}

//🦖封装异步获取个人用户信息方法
export const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await getUserInfoAPI() //改造： const res = await request.get('/user/profile')
        dispatch(setUserInfo(res.data))
    }
}



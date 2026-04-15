//用户相关的状态管理  三步走
import { createSlice } from '@reduxjs/toolkit'
import {request, getToken, setToken , removeToken} from '@/utils'

const userStore = createSlice({
    name: 'user',
    initialState: {
        token: getToken() || '', //从获取token
        userInfo: {}
    },
    //🦖同步修改方法
    reducers: {
        setTokenInfo(state, action) {
            state.token = action.payload//存到redux状态中
            setToken(action.payload)//存到localStorage中
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload
        }
    }
})

export const { setTokenInfo, setUserInfo } = userStore.actions//导出同步修改方法给异步用
export default userStore.reducer//导出reducer
// 替换成上面const userReducer = userStore.reducer

// export { setTokenInfo, setUserInfo }
// export default userReducer

//🦖异步修改方法
export const fetchLogin = (loginForm) => {
    return async (dispatch) => {  //传入dispatch函数 return可省略
        const res = await request.post('/authorizations', loginForm)
        dispatch(setTokenInfo(res.data.token))
    }
}

//🦖获取个人用户信息异步方法
export const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await request.get('/user/profile')
        dispatch(setUserInfo(res.data))
    }
}



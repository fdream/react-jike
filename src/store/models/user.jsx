//用户相关的状态管理  三步走
import { createSlice } from '@reduxjs/toolkit'
import {request, getToken, setToken , removeToken} from '@/utils'

const userStore = createSlice({
    name: 'user',
    initialState: {
        token: getToken() || '' //从获取
    },
    //🦖同步修改方法
    reducers: {
        setUserInfo(state, action) {
            state.token = action.payload.token//存到redux状态中
            setToken(action.payload.token)//存到localStorage中
        }
    }
})

export const { setUserInfo } = userStore.actions//导出同步修改方法
export default userStore.reducer//导出reducer
// 替换成上面const userReducer = userStore.reducer//导出reducer

// export { setUserInfo }
// export default userReducer

//🦖异步修改方法
export const fetchLogin = (loginForm) => {
    return async (dispatch) => {  //传入dispatch函数 return可省略
        const res = await request.post('/authorizations', loginForm)
        dispatch(setUserInfo(res.data))
    }
}



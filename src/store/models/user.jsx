//用户相关的状态管理  三步走
import { createSlice } from '@reduxjs/toolkit'
import request from '@/utils'

const userStore = createSlice({
    name: 'user',
    initialState: {
        token: ''
    },
    //🦖同步修改方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload
        }
    }
})

export const { setToken } = userStore.actions//导出同步修改方法
export default userStore.reducer//导出reducer
// 替换成上面const userReducer = userStore.reducer//导出reducer

// export { setToken }
// export default userReducer

//🦖异步修改方法
export const fetchLogin = (loginForm) => {
    return async (dispatch) => {  //传入dispatch函数 return可省略
        const res = await request.post('/authorizations', loginForm)
        dispatch(setToken(res.data.token))
    }
}



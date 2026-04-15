//组合子模块，导出实例
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './models/user'

const store = configureStore({
    reducer: {
        user: userReducer
    }
})

export default store
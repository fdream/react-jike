//封装和token相关的方法

const TOKENKEY = 'token_key'

export const getToken = () => {
    return localStorage.getItem(TOKENKEY)
}
export const setToken = (token) => {
    localStorage.setItem(TOKENKEY, token)
}
export const removeToken = () => {
    localStorage.removeItem(TOKENKEY)
}

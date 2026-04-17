//文章相关接口
import { request } from '@/utils';

//获取文章频道列表接口
export function getArticleChannelAPI() {
    return request({
        url: '/channels',
        method: 'GET',
    })
}

//发布文章接口
export function publishArticleAPI(formData) {
    return request({
        url: '/mp/articles?draft=false',
        method: 'POST',
        data:formData,   //请求体
    })
}

//获取文章列表接口
export function getArticleListAPI(params) {
    return request({
        url: '/mp/articles',
        method: 'GET',
        params,         //Query参数:同名可省略
    })
}

//获取文章详情
export function getArticleDetailAPI(id) {
    return request({
        url: `/mp/articles/${id}`,
        method: 'GET',
    })
}

//删除文章接口
export function delArticleAPI(id) {
    return request({
        url: `/mp/articles/${id}`, //路径参数：模板字符串/用拼接字符串也行+
        method: 'DELETE',
    })
}


//编辑文章接口
export function editArticleAPI(id,formData) {
    return request({
        url: `/mp/articles/${id}`, 
        method: 'PUT',
        data:formData,
    })
}
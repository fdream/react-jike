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
        data:formData,
    })
}

//获取文章列表接口
export function getArticleListAPI(params) {
    return request({
        url: '/mp/articles',
        method: 'GET',
        params,         //同名可省略
    })
}
//自定义hooks
import { useState, useEffect } from 'react'
import { getArticleChannelAPI } from '@/apis/article'

//1.封装获取渠道列表的逻辑
function useChannel() {
    const [channelList, setChannelList] = useState([])
    // 获取频道列表
    useEffect(() => {
        const getChannelList = async () => {
            const res = await getArticleChannelAPI()
            setChannelList(res.data.channels)
        }
        getChannelList()
    }, [])
    return channelList
}


// export default useChannel
export { useChannel }

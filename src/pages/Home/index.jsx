import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import BarCharts from '@/components/BarCharts';


const Home = () => {

    return (
        <div>
            <BarCharts
            title="前端框架排名"
            xAxisData={['React', 'Vue', 'Angular']}
            seriesData={[5, 20, 36]} />

            <BarCharts
            title="前端课程排名"
            xAxisData={['马老师', '尚硅谷', '黑马程序员']}
            seriesData={[8, 20, 36]} />
        </div>
    )
}
export default Home
//图表组件
//1.把功能代码封装到组件中
//2.把可变参数作为props传递给组件
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const BarCharts = ({ title, xAxisData, seriesData }) => {
    const chartRef = useRef(null)
    useEffect(() => {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(chartRef.current)

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: title
            },
            tooltip: {},
            legend: {
                data: ['销量']
            },
            xAxis: {
                data: xAxisData
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: seriesData
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }, [])
    return (<div ref={chartRef} style={{ width: '600px', height: '400px' }} />
    )
}
export default BarCharts

<template>
 <div>
     <h1>后台首页</h1>
     <v-chart :options="polar"/>
 </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'

// echarts.init 实例化一个图对象
// let tb1 = echarts.init(document.getElementById('box'))
// let options=
// //调用设置配置信息的方法，图就会自动绘画

// tb1.setOption(options)
export default {
 data(){
 return{}
 },
 created(){
     this.polar= {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    // legend: {
    //     orient: 'vertical',
    //     left: 10,
    //     data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    // },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            // radius: ['50%', '70%'],
           
            // label: {
            //     show: false,
            //    position: 'outside'
            // },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: true
            },
            data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
            ]
        }
    ]
};
 },
 methods:{

 },
 components:{
       'v-chart': ECharts
 }
}

</script>
<style scoped>

</style>
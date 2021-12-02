<template>
  <div class="app-container">
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <chart-panel :config="config1" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <chart-panel :config="config2" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <chart-panel :config="config3" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <chart-panel :config="config4" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ChartPanel from '../../components/echarts/ChartPanel.vue'

// 1.单普通折线
const config1 = {
  // 标题组件
  title: {
    show: true,//显示折线图
    text: '简单折线图',//标题文字
    link: 'https://www.baidu.com',//主标题超文本链接
    subtext: '熟悉title的配置',//副标题
    left: 50,//配置标题的位置
    padding: [5, 20, 5, 10], //配置title的padding
    borderColor: '#f2f2f2',
    borderWidth: 3
  },
  // 图例,适用于不同系列数据过滤，和series搭配使用
  legend: {
    data: ['数值'],
    left: 0
  },
  // 工具栏
  toolbox: {
    show: true,//是否显示工具栏组件
    orient: 'vertical', //工具栏icon的布局朝向
    itemSize: 18,//工具栏icon的大小
    itemGap: 20,//item之间的间距
    right: 20,//toolbox的定位位置
    feature: {
      saveImage: { show: true },//导出图片
      dataView: { show: true },//数据视图
      magicType: {//动态类型切换
        type: ['line', 'bar']
      },
      dataZoom: { show: true },//数据区域缩放
      restore: { show: true },//重置
    }
  },
  // 提示框组件
  tooltip: {
    // trigger:'item',//数据项图形触发，主要用于散点图，饼图等无类目轴的图表
    trigger: 'axis',//坐标轴触发，主要用于柱状图、折线图等使用类目轴的图表
    // trigger:'none',//什么都不触发
    axisPointer: {//会出现横向虚线
      type: 'cross'
    },
    backgroundColor: 'blue',//背景色
    textStyle: {
      fontStyle: 'oblique',//oblique italic normal 字体
      fontWeight: 'bold'//100|200|300|400... normal bold bolder lighter 加粗
    }
  },
  // 坐标轴xAxis、yAxis
  xAxis: {
    // name:'x轴',//坐标轴名称
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], //类目数据
    boundaryGap: false, //默认为true,标签和数据点都会在两个刻度之间
    //设置坐标轴的轴线
    axisTick: {
      show: false //是否显示坐标轴刻度
    },
    //设置坐标轴刻度属性
    axisLine: {//重新设置坐标轴及刻度样式
      show: true,
      //设置刻度的样式
      lineStyle: {
        color: 'pink'
      }
    },
  },
  yAxis: {
    // y轴的分割设置
    // splitNumber 分割段数，interval 强制设置坐标轴分割间隔，minInterval 坐标轴最小间隔，maxInterval 坐标轴最大间隔
    type: 'value',
    axisTick: {
      show: false
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: 'purple'
      }
    },
  },
  series: [
    {
      name: '数值',
      data: [150, 230, 224, 218, 135, 147, 260],
      itemStyle: {
        normal: {
          color: '#3888fa',
          lineStyle: {
            // color: '#3888fa',
            color: 'red',
            width: 2
          },
          areaStyle: {
            color: '#f3f8ff' //设置折线以下区域的颜色
            // color: 'yellow'
          }
        }
      },
      type: 'line',
      smooth: false,
      // 标注点[最大值、最小值]
      markPoint: {
        data: [
          {
            type: "max",
            name: "最大值",
            color: "pink",
            itemStyle: {
              color: "rgba(115, 159, 250, .5)",
            },
            symbol: "circle", //symbol为标记的图形有'circle','rect','roundRect','triangle','diamod','pin','arrow'
            symbolSize: [25, 25], // 容器大小
            symbolOffset: [0, -15], //位置偏移
          },
          {
            type: "min",
            name: "最小值",
            color: "rgba(255, 148, 77, 1)",
            itemStyle: {
              color: "rgba(255, 148, 77, .5)",
            },
            symbol: "rect",
            symbolSize: [25, 25], // 容器大小
            symbolOffset: [0, -15], //位置偏移
          },
        ],
      },
      // 标注线[最大值、最小值、平均值]
      markLine: {
        data: [
          { type: 'average', name: '平均值' },
          { type: 'max', name: '最大值' },
          { type: 'min', name: '最小值' },
        ]
      },
      // 添加动画属性，animation默认属性为true
      animationDuration: 2800,
      animationEasing: 'quadraticOut'
    }
  ]
}

// 2.单条柱状图
const config2 = {
  dataZoom: [
    // {
    //   type: "slider",//slider表示有滑动块的，
    //   show: true,
    //   xAxisIndex: [0],//表示x轴折叠
    //   start: 1,//数据窗口范围的起始百分比,表示1%
    //   end: 35//数据窗口范围的结束百分比,表示35%坐标
    // },
    {
      type: 'inside',// 内置于坐标系中
      start: 0,
      end: 30,
      xAxisIndex: [0]
    },

    // {
    //   type: "inside",//           
    //   yAxisIndex: [0],//表示y轴折叠
    //   start: 1,
    //   end: 35
    // },
  ],
  xAxis: {
    type: 'category',
    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    axisLabel: { show: true, interval: 'auto', inside: false, rotate: 90, margin: 8, formatter: null, showMinLabel: null, showMaxLabel: null, },
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130, 240, 320, 480, 110, 90],
      type: 'bar',
      boundaryGap: true,
      barwidth: 30
      // showBackground: true,
      // backgroundStyle: {
      //   color: 'rgba(180, 180, 180, 0.2)'
      // }
    }
  ]
}

// 3.普通饼状图
const config3 = {
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}

// 4.普通雷达图
const config4 = {
  title: {
    text: 'Basic Radar Chart'
  },
  legend: {
    data: ['Allocated Budget', 'Actual Spending']
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: 'Sales', max: 6500 },
      { name: 'Administration', max: 16000 },
      { name: 'Information Technology', max: 30000 },
      { name: 'Customer Support', max: 38000 },
      { name: 'Development', max: 52000 },
      { name: 'Marketing', max: 25000 }
    ]
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: 'Allocated Budget'
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: 'Actual Spending'
        }
      ]
    }
  ]
}


export default {
  components: {
    ChartPanel
  },
  data () {
    return {
      config1,
      config2,
      config3,
      config4
    }
  }
}
</script>

<style scoped>
.chart-wrapper {
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 32px;
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
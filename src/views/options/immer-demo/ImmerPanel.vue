<template>
  <div class="app-container">
    处理结果：
    <p>{{ result1 }}</p>
    <p>{{ result2 }}</p>
    <p>折线图使用immer案例：</p>
    <el-col :xs="24" :sm="24" :lg="12">
      <div class="chart-wrapper">
        <chart-panel :config="lineData" />
      </div>
    </el-col>
  </div>
</template>

<script>
import produce from 'immer';
import ChartPanel from '@/views/components/echarts'

export default {
  name: 'Immer',
  components: {
    ChartPanel
  },
  data () {
    return {
      arr: [1, 2, 3, 4, 5, 6],
      result1: [],
      form: {
        id: 1,
        name: 'falcon',
        age: 20,
        hobby: 'eating',
        identify: '2345'
      },
      result2: {},

      lineData: {
        title: {
          show: true,
          text: '简单折线图'
        },
        legend: {
          data: ['数值']
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '数值',
            data: [],
            type: 'line',
            smooth: false
          }
        ]
      }
    }
  },
  mounted () {
    this.result1 = produce(this.arr, draft => {
      draft[0] = 6
      draft[5] = 1
    })

    const res = produce(this.form, draft => {
      draft['name'] = 'alice'
    });
    this.result2 = { ...res };

    this.lineData = produce(this.lineData, draft => {
      draft.xAxis.data = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      draft.series[0].data = [150, 230, 224, 218, 135, 147, 260]
    })
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
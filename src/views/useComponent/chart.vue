<template>
  <div class="app-container">
    <div class="chart_box">
      <!-- 带标题 -->
      <Chart :config="config" />
    </div>
    <div class="chart_box">
      <!-- 不带标题 -->
      <CaptionChart title="年份变化统计" :config="config" />
    </div>
  </div>
</template>

<script>
import { Chart, CaptionChart } from "@/components/self/Chart";

export default {
  name: "useChart",
  components: {
    Chart,
    CaptionChart,
  },
  data() {
    return {
      config: {},
    };
  },
  created() {
    this.config = {
      legend: {
        show: true,
        icon: "circle",
        textStyle: {
          fontSize: 12,
        },
        // top: 0,
        // right: 0,
        x: "center",
        y: "bottom",
        itemGap: 8,
        itemWidth: 10,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: 0,
        right: 0,
        bottom: 20,
        top: 20,
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          // data: xAxis,
          data: ["2016", "2017", "2018", "2019", "2020"],
          axisTick: {
            show: false,
            alignWithLabel: true,
          },
          axisLabel: {
            interval: 0,
            color: "#7F7F7F",
            fontSize: 16,
            showMaxLabel: true,
            // formatter: (value, index) => {
            //   const strArr = value.split("");
            //   return strArr.join("\n");
            // },
          },
          axisLine: {
            lineStyle: {
              color: "#0A198C",
              width: 0.65,
            },
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#333333",
              width: 1,
            },
          },
          axisLabel: {
            color: "#7F7F7F",
            fontSize: 10,
          },
          splitLine: {
            lineStyle: {
              color: "#D2D2D2",
              width: 1,
            },
          },
          axisTick: {
            show: false,
            inside: true,
            alignWithLabel: true,
          },
        },
      ],
      series: [
        {
          name: "年份变化统计",
          type: "bar",
          barWidth: 20,
          itemStyle: {
            color: "#5EAEFF",
            borderRadius: [4, 4, 0, 0],
          },
          label: {
            show: true,
            position: "top",
          },
          // data: value,
          data: [1, 9, 7, 3, 5],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.chart_box {
  width: 400px;
  height: 300px;
}
</style>

<template>
  <div ref="chart" :class="styles.container" />
</template>

<script>
import * as echarts from "echarts";
require("echarts/theme/macarons");
import styles from "./Chart.module.scss";

export default {
  name: "Chart",
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      styles,
      chartInstance: null,
    };
  },
  watch: {
    config: function () {
      this.initChart();
    },
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
  },
  methods: {
    initChart() {
      const self = this;
      if (!this.chartInstance) {
        this.chartInstance = echarts.init(this.$refs.chart, "macarons");
      }
      this.chartInstance.setOption(this.config);
      this.chartInstance.resize();
      this.chartInstance.off("click");
      this.chartInstance.on("click", function (params) {
        self.$emit("click", params);
      });
      window.addEventListener("resize", () => {
        this.chartInstance.resize();
      });
    },
  },
};
</script>

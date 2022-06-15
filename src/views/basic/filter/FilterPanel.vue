<template>
  <div class="app-container">
    <!-- 全局过滤器 -->
    <p>global_price:{{ price | global_filter }}</p>
    <!-- 局部过滤器 -->
    <p>local_price:{{ price | local_filter }}</p>
    <!-- 多参数过滤器 -->
    <p>multiple_price:{{ price | multiple_filter("$", 2) }}</p>
    <!-- 多个过滤器串联 -->
    <p>series_price:{{ price | first_filter("￥", 5) | last_filter(200) }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      price: 100,
    };
  },
  filters: {
    local_filter(value) {
      return "$" + value;
    },
    multiple_filter(value, sign, hour = 0) {
      return sign + value * hour;
    },
    first_filter(value, sign, times = 1) {
      return sign + value * times;
    },
    last_filter(value, plus = 0) {
      return value + plus;
    },
  },
};
</script>

<template>
  <div class="app-container">
    <div>懒加载下拉框</div>
    <el-select
      clearable
      v-model="selectedYear"
      placeholder="请选择年份"
      v-loadMore="loadMore"
    >
      <el-option
        v-for="item in yearList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedYear: "2022",
      num: 0,
      limit: 10,
      yearList: [],
    };
  },
  mounted() {
    this.yearList = this.createYearList(this.num, this.limit, this.yearList);
  },
  methods: {
    createYearList(start, end, arr) {
      var time = new Date();
      for (let i = start; i < end; i++) {
        arr.push({
          value: time.getFullYear() - i,
          label: time.getFullYear() - i + "年",
        });
      }
      return arr;
    },

    loadMore() {
      this.num = this.limit;
      this.limit += 10;
      this.createYearList(this.num, this.limit, this.yearList);
    },
  },
};
</script>

<template>
  <div class="app-container">
    <p-virtual-transfer
      :basedata="dataList"
      @check-change="checkChange"
      @input="handleInput"
    ></p-virtual-transfer>
    <button @click="handleSplice">basedata--</button>
  </div>
</template>

<script>
import PVirtualTransfer from "../p-virtual-transfer";

export default {
  components: {
    "p-virtual-transfer": PVirtualTransfer,
  },
  data() {
    return {
      dataList: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      // 模拟数据获取
      let arr = [];
      for (let i = 0; i < 10000; i++) {
        arr.push({
          id: i + 1,
          label: `名称：${i + 1}`,
          value: `value${i + 1}`,
        });
      }
      this.dataList = arr;
    },
    checkChange(result) {
      console.log(111, "调用");
      console.log("勾选：", result);
    },
    handleInput() {
      console.log(222, "调用");
    },
    handleSplice() {
      this.dataList.splice(this.dataList.length - 1, 1);
    },
  },
};
</script>

<template>
  <div class="app-container">
    <!-- 输入框输入数字，min最小，max最大，precision精度 -->
    <div style="margin: 10px">
      <el-input-number readonly :min="0" v-model="value" :precision="2"></el-input-number>
    </div>

    <!-- el-input框只能输入数字 -->
    <div style="margin: 10px">
      <el-input
        v-model.number="num"
        onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
      ></el-input>
    </div>

    <!-- el-input过滤特殊字符或身份证脱敏[关键字段打*] -->
    <div style="margin: 10px">
      <el-input
        :value="inputValue"
        @input="(e) => (inputValue = idCardValid(e))"
        placeholder="请输入内容"
      ></el-input>
    </div>

    <!-- el-input除去type为number焦点的上下箭头 -->
    <el-input class="clear-number-input" v-model="number" type="number" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
      num: null,
      inputValue: null,
      number: 0,
    };
  },
  methods: {
    idCardValid(val) {
      console.log(val);
      const idCard = val.replace(/^(\d{6})\d+(\d{4})$/, "$1******$2");
      console.log(idCard);
      return idCard;
    },
  },
};
</script>

<style scoped>
/* 隐藏el-input-number的两端加减操作键 */
.el-input-number >>> .el-input-number__increase,
.el-input-number >>> .el-input-number__decrease {
  display: none;
}
.el-input-number >>> .el-input__inner {
  text-align: left;
  padding: 0 10px;
}

/*el-input的type为number时的样式 */
.clear-number-input >>> input[type="number"]::-webkit-outer-spin-button,
.clear-number-input >>> input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
</style>

<template>
  <div class="app-container">
    <el-input-number
      readonly
      :min="0"
      v-model="value"
      :precision="2"
    ></el-input-number>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 0
    }
  }
}
</script>

<style scoped>
.el-input-number >>> .el-input-number__increase,
.el-input-number >>> .el-input-number__decrease {
  display: none;
}

.el-input-number >>> .el-input__inner {
  text-align: left;
  padding: 0 10px;
}
</style>
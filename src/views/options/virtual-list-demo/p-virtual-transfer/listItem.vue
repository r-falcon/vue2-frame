<template>
  <div class="">
    <el-checkbox v-model="checked" @change="change">
      {{ source[dataLabel] }}
    </el-checkbox>
  </div>
</template>

<script>
import EventMixin from "../mixins.js";

export default {
  components: {},
  mixins: [EventMixin],
  props: {
    source: Object,
    dataLabel: String,
    dataValue: String,
    checkMap: Object,
  },
  data() {
    return {
      checked: false,
    };
  },
  mounted() {
    // 回显勾选状态
    this.checkChange();
  },
  watch: {},
  methods: {
    // 勾选改变
    change(val) {
      this.dispatch(
        "p-virtual-transfer",
        "virtual-transfer-check-change",
        this.source[this.dataValue],
        val
      );
    }, // 选择改变
    checkChange() {
      this.checked = this.checkMap[this.source[this.dataValue]] === true ? true : false;
    },
  },
};
</script>

<style lang="scss" scoped></style>

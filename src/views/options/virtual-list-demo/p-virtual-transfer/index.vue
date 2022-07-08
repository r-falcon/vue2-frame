<template>
  <div class="root">
    <!-- 左侧 -->
    <virtual-list
      ref="Middle"
      title="标题1"
      :data-value="dataValue"
      :data-label="dataLabel"
      :basedata="leftData"
      @check-change="leftChange"
    />

    <!-- 中间按钮 -->
    <div class="game-btn">
      <el-button
        icon="el-icon-arrow-left"
        type="primary"
        title="移到左边"
        @click="move('left')"
      ></el-button>

      <el-button
        icon="el-icon-arrow-right"
        type="primary"
        title="移到右边"
        @click="move('right')"
      ></el-button>
    </div>

    <!-- 右侧 -->
    <virtual-list
      ref="Right"
      title="标题2"
      :data-value="dataValue"
      :data-label="dataLabel"
      :basedata="rightData"
      @check-change="rightChange"
    />
  </div>
</template>

<script>
import VirtualList from "./virtualList.vue";
export default {
  components: {
    "virtual-list": VirtualList,
  },
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      },
    },
    basedata: {
      type: Array,
      default: () => {
        return [];
      },
    },
    dataValue: {
      type: String,
      default: "value",
    },
    dataLabel: {
      type: String,
      default: "label",
    },
  },
  data() {
    return {
      leftData: [],
      leftSelect: [],
      rightData: [],
      rightSelect: [],
    };
  },
  mounted() {
    this.initData(this.value);
  },
  watch: {
    basedata() {
      this.initData(this.value);
    },
  },
  methods: {
    // 初始化数据
    initData(value, type) {
      let valueMap = {};

      value.forEach((item) => {
        valueMap[item] = true;
      });

      if (type) {
        for (let i = 0; i < value.length; i++) {
          if (type == "left") {
            this.rightData &&
              this.rightData.length > 0 &&
              this.rightData.forEach((item, index) => {
                if (valueMap[item[this.dataValue]]) {
                  this.leftData.push(item);
                  this.rightData.splice(index, 1);
                }
              });
            this.sortFun(this.leftData);
            this.sortFun(this.rightData);
          } else if (type == "right") {
            this.leftData &&
              this.leftData.length > 0 &&
              this.leftData.forEach((item, index) => {
                if (valueMap[item[this.dataValue]]) {
                  this.rightData.push(item);
                  this.leftData.splice(index, 1);
                }
              });
            this.sortFun(this.leftData);
            this.sortFun(this.rightData);
          }
        }
      } else {
        let leftArr = [];
        let rightArr = [];

        this.basedata.forEach((item) => {
          if (valueMap[item[this.dataValue]]) {
            rightArr.push(item);
          } else {
            leftArr.push(item);
          }
        });

        this.leftData = leftArr;
        this.rightData = rightArr;
      }
    },

    // 从小到大排序
    sortFun(arr) {
      arr.sort((a, b) => {
        return a.id - b.id;
        // return a.price - b.price || a.postage - b.postage || b.sales - a.sales;
      });
    },

    // 左侧勾选
    leftChange(list) {
      this.leftSelect = list;
    },

    // 右侧勾选
    rightChange(list) {
      this.rightSelect = list;
    },

    // 左右移动
    async move(type) {
      let value = [];
      if (type == "right") {
        if (this.leftSelect.length == 0) {
          this.$message("未勾选任何数据");
          return;
        }
        value = [...this.value, ...this.leftSelect];
      }
      if (type == "left") {
        if (this.rightSelect.length == 0) {
          this.$message("未勾选任何数据");
          return;
        }
        value = [...this.value, ...this.rightSelect];
      }
      this.initData(value, type);
    },
  },
};
</script>

<style lang="scss" scoped>
.root {
  display: flex;
  flex: 1;
  width: 910px;
  .game-left {
    border-right: 1px dashed #ccc;
  }
  .game-btn {
    display: flex;
    align-items: center;
    margin: 0 10px;
  }
}
</style>

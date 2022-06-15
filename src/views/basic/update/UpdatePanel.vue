<template>
  <div class="app-container">
    <!-- 
    强制更新：
      如果没有注意到对象或数组的变更，或依赖了一个未被vue响应式系统跟踪的状态，可能需要强制更新；
      当然注意到上述情况，仍有极少数情况需要强制更新$forceUpdate
   -->
    <button @click="handleAdd">add attr</button>
    <div v-for="item in list" :key="item.id">{{ item }}</div>
    <!-- 通过v-once创建低开销的静态组件 -->
    <div v-once>v-v-once, num is : {{num}}</div>
    <div>num is : {{num}}</div>
    <button @click="handleNumAdd">num++</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          label: "list-01",
        },
        {
          id: 2,
          label: "list-02",
        },
        {
          id: 3,
          label: "list-03",
        },
        {
          id: 4,
          label: "list-04",
        },
        {
          id: 5,
          label: "list-05",
        },
      ],
      isALevel: true,
      isBLevel: true,
      num:1
    };
  },
  methods: {
    handleAdd() {
      let that = this;
      if (this.isALevel) {
        that.list.map((item) => (item.title = "lesson" + item.id));
        if (this.isBLevel) {
          that.list.map((item) => (item.count = item.id + 1));
        }
      }
      // 这种情况由于渲染嵌套太深，导致虽然数据改变，但是页面无法进行rerender，使用$forceUpdate进行强制更新
      this.$forceUpdate(that.list)
    },
    handleNumAdd(){
      this.num++
    }
  },
};
</script>

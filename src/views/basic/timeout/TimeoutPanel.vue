<template>
  <div class="app-container">
    <h3>HookEvent</h3>
    <p>current count is: {{ count }}</p>
    <!-- select组件的change事件传递多个参数 -->
    <div style="margin: 10px">
      <!-- @change="handleChange($event,currentParams)",其他组件用同样的方法传递 -->
      <el-select
        v-model="selectValue"
        placeholder="请选择"
        @change="(val) => handleChange(val, currentParams)"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      selectValue: "",
      currentParams: {
        name: "falcon",
        age: 20,
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
    };
  },
  mounted() {
    // 创建一个定时器
    this.timer = setInterval(() => {
      this.count++;
    }, 1000);
    // 借助hook实现销毁
    this.$once("hook:beforeDestroy", function () {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      console.log("hook执行销毁");
    });
  },
  // beforeDestroy() {
  //   // 销毁定时器
  //   if (this.timer) {
  //     clearInterval(this.timer);
  //     this.timer = null;
  //   }
  //   console.log("执行销毁");
  // },
  methods: {
    handleChange(e, current) {
      console.log(e);
      console.log(current);
    },
  },
};
</script>

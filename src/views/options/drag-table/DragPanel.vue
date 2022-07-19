<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="单行拖拽" name="first">
        <Demo1 />
      </el-tab-pane>
      <el-tab-pane label="多行拖拽" name="second">
        <Demo2 />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Demo1 from "./demo1";
import Demo2 from "./demo2";

export default {
  components: {
    Demo1,
    Demo2,
  },
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

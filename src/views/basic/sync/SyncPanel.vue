<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="普通用法" name="first">
        <SyncDemo1 />
      </el-tab-pane>

      <el-tab-pane label="sync语法糖" name="second">
        <SyncDemo2 />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SyncDemo1 from "./syncDemo1";
import SyncDemo2 from "./syncDemo2";

export default {
  components: {
    SyncDemo1,
    SyncDemo2,
  },
  data() {
    return {
      activeName: "first",
    };
  },
};
</script>

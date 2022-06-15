<template>
  <div class="app-container">
    <!-- 动态组件 -->
    <div style="display: flex">
      <button @click="current = 'A'">A</button>
      <button @click="current = 'B'">B</button>
      <button @click="current = 'C'">C</button>
    </div>
    <!-- 动态组件使用keep-alive包裹，能保持这些组件的状态，避免重复渲染带来的性能问题 -->
    <keep-alive>
      <component :is="current"></component>
    </keep-alive>
  </div>
</template>

<script>
import A from "./A";
import B from "./B";
import C from "./C";
export default {
  components: { A, B, C },
  data() {
    return {
      current: "A",
    };
  },
};
</script>

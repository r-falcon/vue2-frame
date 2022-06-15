<template>
  <div class="app-container">
    <!-- 数据发生冲突时以组件数据优先 -->
    <p>username is : {{ username }}</p>
    <!-- 对象数据进行合并,同名时以组件数据优先 -->
    <div>
      <p>lesson-name:{{ lesson.name }}</p>
      <p>lesson-hour:{{ lesson.hour }}</p>
      <p>lesson-teacher:{{ lesson.teacher }}</p>
    </div>
    <!-- 同名方法的调用以组件数据为先 -->
    <div>{{ sayHi() }}</div>
  </div>
</template>

<script>
import DemoMixin from "../mixin.js";

export default {
  mixins: [DemoMixin],
  data() {
    return {
      username: "falcon",
      lesson: {
        name: "English",
        hour: 4,
      },
    };
  },
  // 混入对象的钩子在自身钩子之前调用
  created() {
    console.log("自身");
  },
  methods: {
    sayHi() {
      return "love and peace";
    },
  },
};
</script>

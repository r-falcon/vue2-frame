<template>
  <div class="app-container">
    <!-- 全局自定义指令 -->
    <input v-focus type="text" />
    <!-- 局部自定义指令 -->
    <div v-xgl v-color="'#fff'">love and peace</div>
    <div v-stys="{ color: 'red', background: 'yellow' }">hello world</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: {
        value: "#fff",
      },
    };
  },

  directives: {
    // 自定义指令
    xgl: {
      inserted(el) {
        // 对DOM进行操作
        el.style.width = "200px";
        el.style.height = "200px";
        el.style.background = "#000";
      },
    },
    // 自定义带参数指令
    color: {
      bind(el, binding) {
        el.style.color = binding.value;
      },
    },
    stys: {
      // bind 指令绑定到元素后调用，只调用一次
      bind(el, binding) {
        el.style.color = binding.value.color;
        el.style.background = binding.value.background;
      },
      // inserted 被绑定元素插入父节点时调用（仅保证父节点存在，但不一定已插入文档）
      // update() 元素更新，子元素未更新时调用
      // componentUpdated() 元素和子级都更新时调用
      // unbind()
    },
  },
};
</script>

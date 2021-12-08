<template>
  <div class="app-container">
    这是富文本组件：
    <Editor v-model="content" />
    <div>
      <p>填入内容(html格式)：</p>
      <div>{{content}}</div>
      <p>渲染内容(常规格式)：</p>
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content:''
    }
  },
}
</script>
<template>
  <div>
    <p>{{ folder.name }}</p>
    <TreeFolderContents :children="folder.children" />
  </div>
</template>

<script>
export default {
  name: "TreeFolder",
  // 【注】循环调用组件时，组件比vue实例后创建；组件必须优先与实例引入，后引入的问题，解决：在组件创建的时候，使用webpack异步
  components: {
    TreeFolderContents:() => import('./TreeFolderContents.vue')
  },
  props: {
    folder: {
      type: Object,
    },
  }
};
</script>

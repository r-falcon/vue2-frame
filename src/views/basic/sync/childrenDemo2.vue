<template>
  <div class="app-container">
    <div v-if="visible">
      这是子组件语法糖相关的内容
      <el-button @click="handleClose">关闭子组件</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    handleClose(){
      this.$emit('update:visible',false)
    }
  },
};
</script>

<template>
  <div>
    <!-- 默认插槽 -->
    <slot>如果没有传值，展示这里的后备内容；传值则展示传值内容</slot>
    <!-- 具名插槽 -->
    <slot name='header'></slot>
    <slot name='footer'></slot>
    <!-- 作用域插槽 -->
    <slot name='scope' v-bind:user="user"></slot>
    <!-- 【注】默认插槽的缩写语法不能和具名插槽混用 -->
    <!-- 动态插槽 -->
    <slot name='tab1' v-bind:message="message"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user:{
        name:'falcon',
        age:20
      },
      message:'dynamic message'
    }
  },
}
</script>
<template>
  <div>
    启动页：
    <el-button type="primary" @click="enterSystem">进入系统</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    enterSystem(){
      this.$router.push('/')
    }
  },
}
</script>
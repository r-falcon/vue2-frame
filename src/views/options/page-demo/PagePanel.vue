<template>
  <div class="app-container">
    主页
    <el-button type="primary" @click="toPage">页面跳转</el-button>
  </div>
</template>

<script>
export default {
  data(){
    return{}
  },

  methods: {
    toPage(){
      this.$router.push('/options/pagedetail')
    }
  },
}
</script>
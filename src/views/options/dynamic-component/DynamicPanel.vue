<template>
  <div class="app-container">
    <component :is="current"></component>
    <el-button @click="handleChange('A')">A</el-button>
    <el-button @click="handleChange('B')">B</el-button>
    <el-button @click="handleChange('C')">C</el-button>
  </div>
</template>

<script>
import A from './comA.vue'
import B from './comB.vue'
import C from './comC.vue'

export default {
  components: {
    A,
    B,
    C
  },
  data () {
    return {
      current: 'A'
    }
  },
  methods: {
    handleChange (params) {
      this.current = params
    }
  }
}
</script>

<style>
</style>
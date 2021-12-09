<template>
  <div class="app-container">
    <div v-for="item in taskOptions" :key="item.value">
      {{ item.label }} - {{ item.value }}
    </div>
    <p>-----分割线-----</p>
    <div v-for="item in statusOptions" :key="item.value">
      {{ item.label }} - {{ item.value }}
    </div>
    <p>-----分割线-----</p>
    <div v-for="item in roleOptions" :key="item.value">
      {{ item.label }} - {{ item.value }}
    </div>
  </div>
</template>

<script>
import mixin from './mixin'
import { rightData } from '../axios-demo/service'

export default {
  mixins: [mixin],
  mounted () {
    this.initData()
  },
  methods: {
    async initData () {
      const res = await rightData()
      setRoleOptions(dataFormat(res.data))
    }
  }
}
</script>
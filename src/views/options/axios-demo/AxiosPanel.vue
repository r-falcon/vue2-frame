<template>
  <div class="app-container">ajax请求样式</div>
</template>

<script>
import { rightData } from './service'
import to from 'await-to-js'

export default {
  mounted () {
    this.initData1()
    this.initData2()
    this.initData3()
  },
  methods: {
    // 1.promise.then
    initData1 () {
      rightData().then(res => {
        console.log('one', res);
      })
    },

    // 2.async/await 
    async initData2 () {
      const res2 = await rightData()
      console.log('two', res2);
    },

    // 3.await-to-js
    async initData3 () {
      const [err, res3] = await to(rightData())
      if (!err) {
        console.log('three', res3);
      }
    }
  }
}
</script>
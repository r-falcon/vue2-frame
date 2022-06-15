<template>
  <div>
    <p>this is A 组件</p>
    <p>count is : {{count}}</p>
    <button @click="addCount">count++</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count:1
    }
  },
  methods:{
    addCount(){
      this.count++
    }
  }
}
</script>
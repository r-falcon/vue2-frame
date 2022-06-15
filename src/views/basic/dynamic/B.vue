<template>
  <div>
    <p>this is B 组件</p>
    <div v-show='visible'>show this page</div>
    <button @click="visible = !visible">toggle</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible:false
    }
  },
}
</script>
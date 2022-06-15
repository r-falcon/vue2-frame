<template>
  <div>
    <MyComponent></MyComponent>
  </div>
</template>

<script>
import Vue from "vue";
Vue.component('my-component', {
  data() {
    return {
      message:'hello world'
    }
  },
  template:`<div><p>message is : {{message}}</p></div>`
})

export default {
  components: {
    MyComponent:'my-component'
  },
};
</script>

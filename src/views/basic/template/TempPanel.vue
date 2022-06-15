<template>
  <div>
    <!-- 使用此标签后会将里面的内容作为模板而不是要分发的内容 -->
    <MyComponent inline-template :message="message" :user="user">
      <div>
        <p>这是内联模板内容</p>
        <p>message is : {{message}}</p>
        <p>user name is : {{user.name}}</p>
        <p>user age is : {{user.age}}</p>
      </div>
    </MyComponent>
  </div>
</template>

<script>
import Vue from 'vue'
var MyComponent = Vue.component('my-component',{

})
export default {
  components: {
    MyComponent:{
      props:['user','message']
    }
  },
  data() {
    return {
      message: "hello world",
      user: {
        name: "falcon",
        age: 20,
      },
    };
  },
};
</script>

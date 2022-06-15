<template>
  <div class="app-container">
    <Son>
    <div>默认插槽内容</div>
    <template #header>
      <div>具名插槽这是header</div>
    </template>
    <template #footer>
      <div>具名插槽这是footer</div>
    </template>
    <!-- <template  v-slot:scope="scope">
      <p>作用域插槽：</p>
      <p>user is:{{scope.user}}</p>
    </template> -->
     <!-- <template  v-slot:scope="{user={name:'alice',age:15}}">
      <p>作用域插槽解构：</p>
      <p>user is:name is : {{user.name}},age is:{{user.age}}</p>
    </template> -->
    <!-- 动态插槽 -->
    <!-- <template v-slot:[tab1]="{message}"> 
    <p>这是动态插槽,传递的内容为：{{message}}</p>
    </template> -->
    <!-- v-slot自vue2.6.0起被弃用 -->
    <template slot='scope' slot-scope="{user={name:'alice',age:15}}">
      <div>
        name is : {{user.name}}，age is : {{user.age}}
      </div>
    </template>

    <template :slot="tab1" slot-scope="{message}">
      <div>
        message is : {{message}}
      </div>
    </template>
    </Son>
  </div>
</template>

<script>
import Son from "./Son";

export default {
  components: {
    Son
  },
  data() {
    return {
      tab1:'tab1',
      tab2:'tab2'
    }
  },
};
</script>

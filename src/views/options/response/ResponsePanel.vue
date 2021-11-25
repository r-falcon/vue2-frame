<template>
  <div class="app-container">
    <p>姓名：{{ name }}</p>
    <p>年龄：{{ age }}</p>
    <div v-for="(item,index) in obj" :key="index">{{ item }}</div>
    <el-button @click="changeObj">改变obj</el-button>
    <div v-for="(item,index) in hobby" :key="index">{{ item }}</div>
    <el-button @click="changeArr">改变arr</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'falcon',
      age: 20,
      obj: {
        occupation: 'programing',
        salary: 8000
      },
      hobby: ['singing', 'dancing', 'cooking']
    }
  },
  methods: {
    changeObj () {
      // this.obj.sex = '女' //不更新
      this.$set(this.obj, 'sex', '女') 
      // 如果要添加多个属性，可以使用Object.assign()
      this.obj = Object.assign({},this.obj,{sex:'女',other:'another'})
    },
    changeArr () {
      // this.hobby[3] = 'eating' //不更新
      this.$set(this.hobby,3,'eating')
      /**
       * vue中更多的时修改数组时不响应，一种是通过索引赋值，一种是改变数组长度
       * 解决：
       *  1.数组api中，能够改变原始数组的，都能触发更新【push、pop、shift、unshift、splice、sort、reverse】
       *  2.返回一个新数组
       *  3.上述都无法实现更新，并且数据已经修改，this.$forceUpdate()方法 （强制刷新）
       */ 
    }
  }
}
</script>
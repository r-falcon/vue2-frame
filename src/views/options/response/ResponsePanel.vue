<template>
  <div class="app-container">
    <p>姓名：{{ name }}</p>
    <p>年龄：{{ age }}</p>
    <div v-for="(item, index) in obj" :key="index">{{ item }}</div>
    <el-button @click="changeObj">改变obj</el-button>
    <div v-for="(item, index) in hobby" :key="index">{{ item }}</div>
    <el-button @click="changeArr">改变arr</el-button>

    <!-- :disable-branch-nodes="true"  设置为只能选中最小叶子节点 -->
    <treeselect 
      disableBranchNodes
      :multiple="true"
      :show-count="true"
      :options="chooseOptions"
      placeholder="请选择"
      style="width:50%;"
    />

    <el-button @click="toPge">路由跳转</el-button>
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';


export default {
  components: {
    Treeselect
  },
  data () {
    return {
      name: 'falcon',
      age: 20,
      obj: {
        occupation: 'programing',
        salary: 8000
      },
      hobby: ['singing', 'dancing', 'cooking'],

      chooseOptions: [
        {
          id: 1,
          label: '富强1',
          children: [
            {
              id: 4,
              label: '和谐4',
              children: [
                {
                  id: 5,
                  label: '自由5',
                }
              ]
            },
            {
              id: 6,
              label: '平等6'
            }
          ]
        },
        {
          id: 2,
          label: '民主2',
          children: [
            {
              id: 7,
              label: '平等1',
            }
          ]
        },
        {
          id: 3,
          label: '文明3'
        }
      ]
    }
  },
  methods: {
    toPge(){
      this.$router.push('/launchpad')
    },

    changeObj () {
      // this.obj.sex = '女' //不更新
      this.$set(this.obj, 'sex', '女')
      // 如果要添加多个属性，可以使用Object.assign()
      this.obj = Object.assign({}, this.obj, { sex: '女', other: 'another' })
    },
    changeArr () {
      // this.hobby[3] = 'eating' //不更新
      this.$set(this.hobby, 3, 'eating')
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
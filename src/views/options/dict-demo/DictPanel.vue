<template>
  <div class="app-container">
    数据字典模型:
    <p>statusOptions:</p>
    <div v-for="item in statusOptions" :key="item.value">
      {{item.value}}-{{item.label}}
    </div>
    <treeselect 
      disableBranchNodes
      :multiple="true"
      :show-count="true"
      :options="levelOptions"
      placeholder="请选择"
      style="width:50%;"
    />
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import {rightData} from './service'

export default {
  components:{
    Treeselect
  },
  computed:{
    ...mapState({
      statusOptions:state => state.dict.statusOptions,
      levelOptions:state => state.dict.levelOptions
    }),
    // 1.第一步的导入
    ...mapMutations({
      setRoleOptions:'dict/setRoleOptions'
    })
  },
  mounted(){
    this.initData()
  },
  methods:{
    initData(){
      rightData().then(res => {
        // 第二步的设置
        this.setRoleOptions(res.data.map(item => ({label:item.authName,value:item.id})))
      })
    }
  }
}
</script>


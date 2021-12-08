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
import {mapState} from 'vuex'
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

export default {
  components:{
    Treeselect
  },
  data() {
    return {
      
    }
  },
  computed:{
    ...mapState({
      statusOptions:state => state.dict.statusOptions,
      levelOptions:state => state.dict.levelOptions
    })
  }
}
</script>


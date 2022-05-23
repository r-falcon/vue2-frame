<template>
  <div class="app-container">
    <ChildrenDemo1 @update="changeVisible" :visible="visible" />
    <el-button @click="handleShow">show</el-button>
  </div>
</template>

<script>
import ChildrenDemo1 from './childrenDemo1'
export default {
  components: {
    ChildrenDemo1
  },
  data() {
    return {
      visible:false
    }
  },
  methods: {
    handleShow(){
      this.visible = true
    },
    changeVisible(val){
      this.visible = val
    }
  },
}
</script>
<template>
  <div class="app-container">
    <ChildrenDemo2 :visible.sync="visible" />
    <el-button @click="handleShow">show</el-button>
  </div>
</template>

<script>
import ChildrenDemo2 from './childrenDemo2'
export default {
  components: {
    ChildrenDemo2
  },
  data() {
    return {
      visible:false
    }
  },
  methods: {
    handleShow(){
      this.visible = true
    }
  },
}
</script>
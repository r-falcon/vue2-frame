<template>
  <div class="app-container">
    table pagination
    {{tableData}}
  </div>
</template>

<script>
import res from './service'

export default {
  data(){
    return{
      tableData:res
    }
  }
}
</script>
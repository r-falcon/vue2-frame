<template>
  <div class="app-container">
  <h3>内联模板</h3>
    <TempPanel />
    <h3>x-template</h3>
    <XTempPanel />
  </div>
</template>

<script>
import TempPanel from './TempPanel'
import XTempPanel from './XTempPanel'
export default {
  components:{
    TempPanel,
    XTempPanel
  }
}
</script>
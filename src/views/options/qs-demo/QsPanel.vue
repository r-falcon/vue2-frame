<template>
  <div class="app-container">
    <p>qs的使用:</p>
    <div>qs.stringfy(obj) {{ stringifyObj }}</div>
    <div>qs.parse(url) {{ parseUrl }}</div>
  </div>
</template>

<script>
// import Qs from 'qs'
const Qs = require('qs')

export default {
  data () {
    return {
      url: 'method=like&projectId=85&appToken=abc',
      object: {
        method: "like",
        projectId: "85",
        appToken: "abc",
        datasetId: "12564701"
      },
      stringifyObj:'',
      parseUrl:{}
    }
  },
  mounted(){
    this.stringifyObj = Qs.stringify(this.object)
    this.parseUrl = Qs.parse(this.url)
  }
}
</script>
<template>
  <div class='app-container'>
    <Children :count1='count1' :count2='count2' :count3='count3' @addCount2='addCount2' @addCount3='addCount3' />
  </div>
</template>

<script>
import Children from './Children'

export default {
  components:{
    Children
  },
  data() {
    return {
      count1:1,
      count2:2,
      count3:3
    }
  },
  methods: {
    addCount2(){
      this.count2++
    },
    addCount3(){
      this.count3++
    }
  },
}
</script>
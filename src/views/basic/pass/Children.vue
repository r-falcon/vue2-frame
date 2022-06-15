<template>
  <div>
    <p>children,count1 is : {{count1}}</p>
    <Children2 v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
import Children2 from './Children2'

export default {
  components:{
    Children2
  },
  props:{
    count1:{
      type:Number,
      default:0
    }
  }
}
</script>
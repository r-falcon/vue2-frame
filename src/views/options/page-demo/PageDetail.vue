<template>
 <Subpage content="详情页" @back="goBack">
   这是页面详情1111
 </Subpage>
</template>

<script>
import {Subpage} from '@/components/Subpage'

export default {
  components:{
    Subpage
  },
  methods: {
    goBack(){
      this.$router.go(-1)
    }
  },
}
</script>
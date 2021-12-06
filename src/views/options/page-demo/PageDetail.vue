<template>
  <Subpage content="详情页" @back="goBack">
    <div class="show">
      <Description width="50%" label="表演类型">迷惑行为</Description>
      <Description width="50%" label="获奖类型">年度最佳</Description>
      <Description width="50%" label="主要嘉宾">全体员工</Description>
      <Description width="200%" label="获奖感言">暂时没有111111111111111111111111111111111111111111111111暂时没有111111111111111111111111111111111111111111111111</Description>
    </div>
  </Subpage>
</template>

<script>
import { Subpage } from '@/components/Subpage'
import { Description } from '@/components/Description'

export default {
  components: {
    Subpage,
    Description
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  },
}
</script>

<style scoped>
.show {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
</style>
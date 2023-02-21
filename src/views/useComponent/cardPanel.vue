<template>
  <div class="app-container">
    <div class="card_box">
      <CardPanel type="simple" shadow="hover">
        <div style="padding: 20px">type为simple的card内容</div>
      </CardPanel>
    </div>
    <CardPanel type="basic" title="新增" shadow="hover">
      <div style="padding: 20px">type为basic的card内容</div>
    </CardPanel>
  </div>
</template>

<script>
import { CardPanel } from "@/components/self/CardPanel";

export default {
  name: "useCardPanel",
  components: { CardPanel },
};
</script>

<style lang="scss" scoped>
.card_box {
  width: 400px;
  height: 300px;
}
</style>

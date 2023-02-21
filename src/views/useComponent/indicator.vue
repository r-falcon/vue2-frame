<template>
  <div class="app-container">
    <Indicator title="税收" :value="43" :ratio="1.2" />
    <Indicator title="经费" :value="26" :ratio="-0.8" />
  </div>
</template>

<script>
import { Indicator } from "@/components/self/Indicator";

export default {
  name: "useIndicator",
  components: { Indicator },
};
</script>

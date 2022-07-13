<template>
  <div>
    <h2>封装</h2>
    <BaseCheckbox v-model="lovingVue" />
  </div>
</template>

<script>
import BaseCheckbox from "./BaseCheckbox";

export default {
  components: {
    BaseCheckbox,
  },
  data() {
    return {
      lovingVue: false,
    };
  },
};
</script>

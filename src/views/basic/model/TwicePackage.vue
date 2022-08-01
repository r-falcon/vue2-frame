<template>
  <div>
    <h2>二次封装</h2>
    <Package v-model="newLovingVue" />
  </div>
</template>

<script>
import Package from "./Package";

export default {
  components: {
    Package,
  },
  model: {
    prop: "lovingVue",
    event: "change",
  },
  props: ["lovingVue"],
  data() {
    return {
      newLovingVue: this.lovingVue,
    };
  },
  watch: {
    newLovingVue: function (newVal, oldVal) {
      this.$emit("change", newVal);
    },
  },
};
</script>

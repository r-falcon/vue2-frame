<template>
  <div class="app-container">
    <Package />
    <TwicePackage />
  </div>
</template>

<script>
import Package from "./Package";
import TwicePackage from "./TwicePackage";

export default {
  components: {
    Package,
    TwicePackage,
  },
};
</script>

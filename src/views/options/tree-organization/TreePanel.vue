<template>
  <div class="app-container">
    <VueTreeChart />
    <Vue2OrgTree />
  </div>
</template>

<script>
import VueTreeChart from "./vue-tree-chart";
import Vue2OrgTree from "./vue-org-tree";

export default {
  components: {
    VueTreeChart,
    Vue2OrgTree,
  },
};
</script>

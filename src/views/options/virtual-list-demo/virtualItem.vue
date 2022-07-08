<template>
  <div class="virtualList-item" style="display: flex">
    <span class="content">{{ source.id }}</span>
    <div>{{ source.title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
    },
    source: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

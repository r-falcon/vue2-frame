<template>
  <div class="aaaaaa">
    <div v-for="(item, index) in list" :key="index" class="list-item">
      <div class="item-name">
        <span>{{ item.name }}</span>
      </div>
      <template v-if="item.children">
        <Recursion :list="item.children" class="children-item" />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recursion",
  props: {
    list: Array,
  },
};
</script>

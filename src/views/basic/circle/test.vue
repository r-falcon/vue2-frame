<template>
  <div>
    <ul v-for="item in list" :key="item.id">
      <li>
        <p>{{ item.label }}</p>
        <Test :list="item.children" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Test",
  props: {
    list: {
      type: Array,
    },
  }
};
</script>

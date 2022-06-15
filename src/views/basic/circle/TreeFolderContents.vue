<template>
  <div>
    <ul>
      <li v-for="folder in children" :key="folder.name">
        <TreeFolder v-if="folder.children" :folder="folder" />
        <div v-else>{{ folder.name }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import TreeFolder from "./TreeFolder";
export default {
  name: "TreeFolderContents",
  components: {
    TreeFolder,
  },
  props: {
    children: {
      type: Array,
    },
  }
};
</script>

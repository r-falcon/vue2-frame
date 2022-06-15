<template>
  <div class="app-container">
    <p>递归组件:</p>
    <Test :list="list" />
    <p>循环引用</p>
    <ul>
      <li v-for="folder in folders" :key="folder.name">
        <TreeFolder :folder="folder" />
      </li>
    </ul>
  </div>
</template>

<script>
import Test from "./test";
import TreeFolder from "./TreeFolder";
export default {
  components: {
    Test,
    TreeFolder,
  },
  data() {
    return {
      list: [
        {
          id: 1,
          label: "list-01",
          children: [
            {
              id: 11,
              label: "list-11",
            },
            {
              id: 12,
              label: "list-12",
            },
          ],
        },
        {
          id: 2,
          label: "list-02",
          children: [
            {
              id: 21,
              label: "list-21",
            },
            {
              id: 22,
              label: "list-22",
            },
          ],
        },
        {
          id: 3,
          label: "list-03",
        },
      ],
      folders: [
        {
          name: "folder1",
          children: [
            {
              name: "folder1 - folder1",
              children: [
                {
                  name: "folder1 - folder1 - folder1",
                },
              ],
            },
            {
              name: "folder1 - folder2",
              children: [
                {
                  name: "folder1 - folder2 - folder1",
                },
                {
                  name: "folder1 - folder2 - folder2",
                },
              ],
            },
          ],
        },
        {
          name: "folder 2",
          children: [
            {
              name: "folder2 - folder1",
              children: [
                {
                  name: "folder2 - folder1 - folder1",
                },
              ],
            },
            {
              name: "folder2 - folder2",
              children: [
                {
                  name: "folder2-content1",
                },
              ],
            },
          ],
        },
        {
          name: "folder 3",
          children: [
            {
              name: "folder3 - folder1",
              children: [
                {
                  name: "folder3 - folder1 - folder1",
                },
              ],
            },
            {
              name: "folder3 - folder2",
              children: [
                {
                  name: "folder3-content1",
                },
              ],
            },
          ],
        },
      ],
    };
  },
};
</script>

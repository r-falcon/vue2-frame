<template>
  <div class="app-container">
    <h3>Demo</h3>
    <div class="long_content" style="width: 300px; height: 90px; border: 1px solid #ccc">
      <!-- 
      样式
      每一行的唯一id标识
      列表数据
      单行数据需要展示的内容
      虚拟列表在页面展示的数量
      单行行高
     -->
      <virtual-list
        style="height: 100%; overflow-y: auto; padding-righ: 16px"
        :data-key="'id'"
        :data-sources="items"
        :data-component="itemComponent"
        :keeps="6"
        :estimate-size="16"
      />
    </div>

    <h3>案例</h3>
    <case-demo></case-demo>
  </div>
</template>

<script>
// 长列表，item同宽高
import virtualList from "vue-virtual-scroll-list";
import Item from "./virtualItem";
import CaseDemo from "./demo";

export default {
  components: {
    "virtual-list": virtualList,
    CaseDemo,
  },
  data() {
    return {
      itemComponent: Item,
      items: [
        {
          id: 1,
          title: "item-1",
        },
        {
          id: 2,
          title: "item-2",
        },
        {
          id: 3,
          title: "item-3",
        },
        {
          id: 4,
          title: "item-4",
        },
        {
          id: 5,
          title: "item-5",
        },
        {
          id: 6,
          title: "item-6",
        },
        {
          id: 7,
          title: "item-7",
        },
        {
          id: 8,
          title: "item-8",
        },
        {
          id: 9,
          title: "item-9",
        },
        {
          id: 10,
          title: "item-10",
        },
        {
          id: 11,
          title: "item-1",
        },
        {
          id: 12,
          title: "item-2",
        },
        {
          id: 13,
          title: "item-3",
        },
        {
          id: 14,
          title: "item-4",
        },
        {
          id: 15,
          title: "item-5",
        },
        {
          id: 16,
          title: "item-6",
        },
        {
          id: 17,
          title: "item-7",
        },
        {
          id: 18,
          title: "item-8",
        },
        {
          id: 19,
          title: "item-9",
        },
        {
          id: 20,
          title: "item-10",
        },
      ],
    };
  },
};
</script>

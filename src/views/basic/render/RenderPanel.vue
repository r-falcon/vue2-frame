<template>
  <div class="app-container">
    <!-- 
      递归组件每次递归都会把最外层的div（vue2.x中只允许出现一个根节点）添加进去
      递归组件每次都会渲染一下最外层的容器
      函数渲染最外层的容器消失
    -->
    <p style="color: red">递归组件</p>
    <Recursion :list="list" />
    <p style="color: red">渲染函数</p>
    <RecursionRender :list="list" />
  </div>
</template>

<script>
import Recursion from "./Recursion";
import RecursionRender from "./RecursionRender.js";

export default {
  components: {
    Recursion,
    RecursionRender,
  },
  data() {
    return {
      list: [
        {
          name: "广东",
          children: [
            {
              name: "广州",
              children: [
                {
                  name: "天河区",
                },
                {
                  name: "黄浦区",
                },
              ],
            },
            {
              name: "深圳",
              children: [
                {
                  name: "福田区",
                },
                {
                  name: "南山区",
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

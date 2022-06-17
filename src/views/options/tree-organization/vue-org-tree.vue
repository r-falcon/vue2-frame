<template>
  <div>
    <div style="margin: 20px auto">
      <el-button @click="handleToggle">切换布局：水平/垂直</el-button>
      <el-button @click="handleFolder">是否折叠：折叠/不折叠</el-button>
    </div>

    <!-- 
      data:就是数据格式，时一个对象，具体格式下面有示例
      horizontal:默认是false，即纵向展示
      label-class-name:可以给节点添加的类名，不过我这边使用了没有效果，下面有其他方法来处理节点样式
      collapsable:是否折叠，有这个属性，则表示默认折叠，有其他方法可以在存在此属性时，也保证是展开状态
      on-expand:点击折叠点，点击可以展开，再次点击可以折叠，是个方法
      on-node-click:顾名思义，就是点击节点，触发的事件
      on-node-mouseover:鼠标移入节点触发的事件，可以触发一个弹层用于展示详情
      on-node-mouseout:鼠标移出节点触发的事件，可以控制详情弹层的隐藏
     -->
    <vue2-org-tree
      :data="data"
      :props="props"
      :horizontal="horizontalValue"
      :collapsable="collapsableValue"
      :label-class-name="labelClassName"
      @on-expand="onExpand"
      @on-node-click="onNodeClick"
      @on-node-mouseover="onNodeMouseover"
      @on-node-mouseout="onNodeMouseout"
    />

    <!-- 创建悬浮盒子 -->
    <div v-show="BasicSwitch" class="floating">
      <p>ID:{{ BasicInfo.id }}</p>
      <p>name:{{ BasicInfo.label }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        id: 0,
        label: "XXX科技有限公司",
        children: [
          {
            id: 2,
            label: "产品研发部",
            children: [
              {
                id: 5,
                label: "研发-前端",
              },
              {
                id: 6,
                label: "研发-后端",
              },
              {
                id: 9,
                label: "UI设计",
              },
              {
                id: 10,
                label: "产品经理",
              },
            ],
          },
          {
            id: 3,
            label: "销售部",
            children: [
              {
                id: 7,
                label: "销售一部",
              },
              {
                id: 8,
                label: "销售二部",
              },
            ],
          },
          {
            id: 4,
            label: "财务部",
          },
          {
            id: 9,
            label: "HR人事",
          },
        ],
      },
      // 注意props一定要把expand写进去，不然折叠展开不去作用，获取不到expand值
      props: {
        label: "label",
        children: "children",
        expand: "expand",
      },
      horizontalValue: true,
      collapsableValue: true,
      labelClassName: "tagClass",

      BasicSwitch: true,
      BasicInfo: { id: null, label: null },
    };
  },
  methods: {
    // 水平垂直展示切换
    handleToggle() {
      this.horizontalValue = !this.horizontalValue;
    },
    // 是否折叠按钮控制
    handleFolder() {
      this.collapsableValue = !this.collapsableValue;
      this.toggleExpand(this.data, this.collapsableValue);
      console.log(this.data);
    },
    toggleExpand(data, val) {
      var _this = this;
      if (Array.isArray(data)) {
        data.forEach(function (item) {
          _this.$set(item, "expand", val);
          if (item.children) {
            _this.toggleExpand(item.children, val);
          }
        });
      } else {
        this.$set(data, "expand", val);
        if (data.children) {
          _this.toggleExpand(data.children, val);
        }
      }
    },

    // 展开折叠的节点
    collapse(list) {
      var _this = this;
      list.forEach(function (child) {
        if (child.expand) {
          child.expand = false;
        }
        child.children && _this.collapse(child.children);
      });
    },
    onExpand(e, data) {
      if ("expand" in data) {
        data.expand = !data.expand;
        if (!data.expand && data.children) {
          this.collapse(data.children);
        }
      } else {
        this.$set(data, "expand", true);
      }
    },

    // 节点点击事件
    onNodeClick(e, data) {
      console.log("data", data);
    },

    // 鼠标移入移出事件
    onNodeMouseout(e, data) {
      this.BasicSwitch = false;
    },
    onNodeMouseover(e, data) {
      this.BasicInfo = data;
      this.BasicSwitch = true;
      var floating = document.getElementsByClassName("floating")[0];
      floating.style.left = e.clientX + "px";
      floating.style.top = e.clientY + "px";
    },
  },
};
</script>

<style>
.tagClass {
  color: #fff;
  background: orange;
}
.tagSelectedClass {
  color: #222;
  background: green;
}
.floating {
  background: rgba(0, 0, 0, 0.7);
  width: 160px;
  height: 100px;
  position: absolute;
  color: #fff;
  padding-top: 15px;
  border-radius: 15px;
  padding-left: 15px;
  box-sizing: border-box;
  left: 0;
  top: 0;
  transition: all 0.3s;
  z-index: 999;
  text-align: left;
  font-size: 12px;
}
</style>

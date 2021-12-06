<template>
  <table v-if="treeData && treeData.label">
    <tr>
      <td
        :colspan="treeData.children ? treeData.children.length * 2 : 1"
        :class="{
          parentLevel: treeData.children,
          extend:
            treeData.children && treeData.children.length && treeData.extend,
        }"
      >
        <div :class="{ node: true, hasMate: treeData.mate}">
          <div class="person" @click="$emit('click-node', treeData)">
            <div class="avat" :class="treeData.id === 11 ? 'pavat' : ''">
              <span>{{ treeData.label }}</span>
            </div>
          </div>
        </div>
      </td>
    </tr>
    <tr v-if="treeData.children && treeData.children.length && treeData.extend">
      <td
        v-for="(children, index) in treeData.children"
        :key="index"
        colspan="2"
        class="childLevel"
      >
        <TreeUp :json="children" @click-node="$emit('click-node', $event)" />
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'TreeUp',
  props: {
    json: {}
  },

  data () {
    return {
      treeData: {}
    }
  },

  watch: {
    json: {
      handler: function (Props) {
        let extendKey = function (jsonData) {
          jsonData.extend = jsonData.extend === void 0 ? true : !!jsonData.extend;
          return jsonData
        }
        if (Props) {
          this.treeData = extendKey(Props)
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  border-collapse: separate !important;
  border-spacing: 0 !important;
}

td {
  position: relative;
  vertical-align: top;
  padding: 0 0 30px 0;
  text-align: center;
}

.parent {
  background: #19d8b5 !important;
  font-weight: bold;
}

// .extend_handle {
//   position: absolute;
//   left: 50%;
//   bottom: 27px;
//   width: 10px;
//   height: 10px;
//   padding: 10px;
//   transform: translate3d(-15px, 0, 0);
//   cursor: pointer;
// }

// .extend_handle:before {
//   content: "";
//   display: block;
//   width: 100%;
//   height: 100%;
//   box-sizing: border-box;
//   border: 2px solid;
//   border-color: #ccc #ccc transparent transparent;
//   transform: rotateZ(135deg);
//   transform-origin: 50% 50% 0;
//   transition: transform ease 300ms;
// }

// .extend_handle:hover:before {
//   border-color: #333 #333 transparent transparent;
// }
// .extend .extend_handle:before {
//   transform: rotateZ(-45deg);
// }

.extend::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 15px;
  height: 15px;
  // border-left: 2px solid #ccc;
  border-left: 1px solid #000;
  transform: translate3d(-1px, 0, 0);
}
.childLevel::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 100%;
  height: 15px;
  // border-left: 2px solid red;
  border-left: 1px solid #000;
  transform: translate3d(-1px, 0, 0);
}
.childLevel::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: -15px;
  // border-top: 5px solid red;
  border-top: 1px solid #000;
}
.childLevel:first-child:before,
.childLevel:last-child:before {
  display: none;
}
.childLevel:first-child:after {
  left: 50%;
  height: 15px;
  // border: 2px solid;
  // border-color: #ccc transparent transparent #ccc;
  border: 1px solid;
  border-color: #000 transparent transparent #000;
  // border-radius: 6px 0 0 0;
  border-radius: 2px 0 0 0;
  transform: translate3d(1px, 0, 0);
}
.childLevel:last-child:after {
  right: 50%;
  height: 15px;
  // border: 2px solid;
  // border-color: #ccc #ccc transparent transparent;
  border: 1px solid;
  border-color: #000 #000 transparent transparent;
  // border-radius: 0 6px 0 0;
  border-radius: 0 2px 0 0;
  transform: translate3d(-1px, 0, 0);
}
.childLevel:first-child.childLevel:last-child::after {
  display: none;
  left: auto;
  border-radius: 0;
  border-color: transparent #ccc transparent transparent;
  transform: translate3d(1px, 0, 0);
}

.node {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  padding: 0 5px;
}

.node.pnode:hover{
  transform: scale(1.02);
}
.node .person {
  // padding-top: 15px;
  padding-top: 5px;
  position: relative;
  display: inline-block;
  z-index: 2;
  // width: 130px;
  width: 200px;
  height: 80px;
  overflow: hidden;
  cursor: pointer;
}
.node .person .avat {
  padding: 5px;
  padding-top: 20px;
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  margin: auto;
  word-break: break-all;
  background: #dae9ff;
  // background: #fff;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &.pavat{
    background: #3470c6;

    span{
      color: #fff;
    }
  }

  span {
    font-size: 18px;
    font-family: MicrosoftYaHei;
    color: #333;
    margin-bottom: 5px;
  }

  .opreate_icon {
    display: none;
  }
  &:hover {
    .opreate_icon {
      display: block;
      position: absolute;
      top: -3px;
      right: -3px;
      padding: 5px;
    }
  }
}
.node .person .avat img {
  cursor: pointer;
}
.node .person .name {
  height: 2em;
  line-height: 2em;
  overflow: hidden;
  width: 100%;
}
.node.hasMate::after {
  content: "";
  position: absolute;
  left: 2em;
  right: 2em;
  top: 15px;
  border-top: 2px solid #ccc;
  z-index: 1;
}
.node.hasMate .person:last-child {
  margin-left: 1em;
}

.el-dialog__header {
  padding: 0;
  padding-top: 30px;
  margin: 0 30px;
  border-bottom: 1px solid #f1f1f1;
  text-align: left;
  .el-dialog__title {
    font-size: 14px;
    font-weight: bold;
    color: #464c5b;
    line-height: 20px;
  }
}
.tips {
  padding: 0 20px;
  .el-select {
    width: 100%;
  }
  .blue {
    color: #00b5ef;
  }
  .check {
    margin-left: 100px;
  }
  .inquiry {
    font-weight: bold;
  }
  .el-form-item__label {
    display: block;
    float: none;
    text-align: left;
  }
  .el-form-item__content {
    margin-left: 0;
  }
}
.el-dialog__body {
  padding: 30px 25px;
  p {
    margin-bottom: 15px;
  }
}
.el-dialog__headerbtn {
  top: 30px;
  right: 30px;
}

// 竖向
.landscape {
  transform: translate(-100%, 0) rotate(-90deg);
  transform-origin: 100% 0;
  .node {
    text-align: left;
    height: 8em;
    width: 8em;
  }
  .person {
    position: relative;
    transform: rotate(90deg);
    // padding-left: 4.5em;
    // height: 4em;
    top: 35px;
    left: 12px;
    width: 110px;
  }
}

.el-popover {
  .el-button {
    padding: 8px !important;
    margin-left: 5px !important;
    float: left;
  }
}
</style>
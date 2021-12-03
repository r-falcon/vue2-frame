<template>
  <table v-if="treeData && treeData.label">
    <tr v-if="treeData.children">
      <td
        v-for="(children, index) in treeData.children"
        :key="index"
        colspan="2"
        class="childLevel"
      >
        <TreeUp :json="children" @click-node="$emit('click-node', $event)" />
      </td>
    </tr>
    <tr>
      <td
        :colspan="treeData.children ? treeData.children.length * 2 : 1"
        :class="{
          parentNode: treeData.children && treeData.children.length > 0,
        }"
      >
        <div class="node">
          <div class="person" @click="$emit('click-node', treeData)">
            <div class="avat" :class="treeData.id === 11 ? 'pavat' : ''">
              <span>{{ treeData.label }}</span>
            </div>
          </div>
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'TreeUp',
  props: {
    json: {},
    // parent: {
    //   type: String
    // }
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
          if (Array.isArray(jsonData.children)) {
            jsonData.children.forEach(c => {
              extendKey(c)
            });
          }
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
  vertical-align: bottom;
  padding: 0 0 30px 0;
  text-align: center;
}

.parent {
  background: #19d8b5 !important;
  font-weight: bold;
}

.parentNode::after {
  // display: none;
  content: "";
  position: absolute;
  left: 49.9%;
  top: -56px;
  height: 30px;
  // border-left: 2px solid #ccc;
  border-left: 1px solid #000;
}
.childLevel::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 45px;
  // bottom: 100%;
  height: 15px;
  // border-left: 2px solid #ccc;
  border-left: 1px solid #000;
  transform: translate3d(-1px, 0, 0);
}
.childLevel::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 44px;
  // border-top: 2px solid #ccc;
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
  // border-color: transparent transparent #ccc #ccc;
  border: 1px solid;
  border-color: transparent transparent #000 #000;
  // border-radius: 6px 0 0 0;
  border-radius: 2px 0 0 0;
  transform: translate3d(1px, 0, 0);
}
.childLevel:last-child:after {
  right: 50%;
  height: 15px;
  // border: 2px solid;
  // border-color: transparent #ccc #ccc transparent;
  border: 1px solid;
  border-color: transparent #000 #000 transparent;
  // border-radius: 0 6px 0 0;
  border-radius: 0 2px 0 0;
  transform: translate3d(-1px, 0, 0);
}
.childLevel:first-child.childLevel:last-child::after {
  /* 改动为none */
  display: none;
  left: auto;
  border-radius: 0;
  border-color: transparent #ccc transparent transparent;
  // border-color: transparent #000 transparent transparent;
  transform: translate3d(1px, 0, 0);
}

.node {
  position: relative;
  display: inline-block;
  /* width: 13em; */
  box-sizing: border-box;
  text-align: center;
  padding: 0 5px;

  &:hover {
    transform: scale(1.02);
  }
}
.node .person {
  padding-top: 5px;
  position: relative;
  display: inline-block;
  z-index: 2;
  width: 200px;
  height: 80px;
  overflow: hidden;
  cursor: pointer;
}

.node .person .avat {
  padding: 5px;
  padding-top: 20px;
  width: 100%;
  height: 100%;
  background: #dae9ff;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  span {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #333;
    margin-bottom: 5px;
  }

  &.pavat{
    background: #3470c6;

    span{
      color: #fff;
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
</style>
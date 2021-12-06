<template>
  <div class="app-container">
    <!-- 不需要安装任何组件 -->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="正序树形控件" name="first">
        <TreeUp :json="downData" @click-node="handleNodeClick"></TreeUp>
      </el-tab-pane>

      <el-tab-pane label="倒序树形控件" name="second">
        <TreeDown :json="downData" @click-node="handleNodeClick"></TreeDown>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { TreeUp, TreeDown } from '@/views/components/tree'

export default {
  components: {
    TreeUp,
    TreeDown
  },
  data () {
    return {
      activeName: 'first',
      upData: {},
      downData: {
        id: 11,
        label: '父级1-1',
        children: [
          {
            id: 21,
            label: '子级2-1',
            children: [
              {
                id: 31,
                label: '子级3-1',
              },
              {
                id: 32,
                label: '子级3-2',
              }
            ]
          },
          {
            id: 22,
            label: '子级2-2',
            children: [
              {
                id: 41,
                label: '子级4-1',
              }
            ]
          },
          {
            id: 23,
            label: '子级2-3',
            children: [
              {
                id: 51,
                label: '子级5-1',
              },
              {
                id: 52,
                label: '子级5-2',
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    handleClick (tab) {
      this.activeName = tab.$options.propsData.name
    },
    handleNodeClick(value) {
      console.log('nodeClick', value);
    }
  },
}
</script>
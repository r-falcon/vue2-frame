<template>
  <div class="app-container">
    <!-- 设置某些节点禁止选择,isDisabled,单选多选均可用 -->
    <treeselect
      :show-count="true"
      :multiple="true"
      :options="epTree"
      :normalizer="normalizer"
      placeholder="请选择"
      style="width: 50%"
    />

    <!-- 设置某些节点禁止选择，disabled，只在有checkbox选框的时候有作用 -->
    <el-tree :data="epTree" node-key="id" show-checkbox :props="defaultProps" />
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

const treeData = [
  {
    id: 11,
    label: '父级1-1',
    children: [
      {
        id: 21,
        label: '子级2-1',
        children: [
          {
            id: 31,
            label: '子子级3-1',
            children: null,
          }
        ]
      },
      {
        id: 22,
        label: '子级2-2',
        children: [
          {
            id: 32,
            label: '子子级3-2',
            isDisabled: true,
            // disabled: true,
            children: [
              {
                id: 41,
                label: '子子子级4-1',
                children: null
              }
            ]
          },
          {
            id: 33,
            label: '子子级3-3',
            children: null
          },
        ]
      },
      {
        id: 23,
        label: '子级2-3',
        children: null,
        isDisabled: true,
        // disabled: true
      }
    ]
  },
  {
    id: 12,
    label: '父级1-2',
    children: null
  }
]

export default {
  components: {
    Treeselect
  },
  data () {
    return {
      treeData,
      normalizer (node) {
        return {
          id: node.id,
          label: node.label,
          children: node.children,
        }
      },
      defaultProps:{
        label:'label',
        children:'children'
      }
    }
  },
  computed: {
    epTree () {
      return this.deleteChildren(treeData)
    }
  }
}
</script>
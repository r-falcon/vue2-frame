<template>
  <div class="app-container">
    <el-tree
      :data="epTree"
      default-expand-all
      :props="defaultProps"
      :expand-on-click-node="false"
      :render-content="renderContent"
    ></el-tree>

    <el-dialog
      title="新增"
      :visible.sync="addDialog"
      width="30%"
      :before-close="handleAddClose"
      :modal-append-to-body="false"
    >
      <span>node信息：</span>
      <div>{{ nodeInfo }}</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addDialog = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改"
      :visible.sync="editDialog"
      width="30%"
      :before-close="handleEditClose"
      :modal-append-to-body="false"
    >
      <span>node信息：</span>
      <div>{{ nodeInfo }}</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="editDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      /**
       * flag=1 新增、删除
       * flag=2 修改、删除
       * flag=3 修改
       */
      epTree: [
        {
          id: 1,
          label: '一级公司',
          flag: 1,
          children: [
            {
              id: 11,
              label: '一级子公司1',
              flag: 2,
              children: [
                {
                  id: 22,
                  label: '二级子公司11',
                  flag: 1
                }
              ]
            },
            {
              id: 12,
              label: '一级子公司2',
              flag: 3
            }
          ]
        }
      ],
      // 当获取到的数据与这里的字段不相符时，可以进行相应的对应设置
      defaultProps: {
        id: 'id',
        label: 'label',
        children: 'children'
      },
      addDialog: false,
      editDialog: false,
      nodeInfo: []
    }
  },

  methods: {
    renderContent (h, { node, data, store }) {
      return (
        <div style="width:100%;">
          <span style="margin-right:10px;">{node.label}</span>
          {
            data.flag === 1 ? <span><i on-click={() => this.append(data)} class="el-icon-plus" title="添加"></i></span> : ''
          }

          {
            (data.flag === 2 || data.flag === 3) ? <span style="margin-left:8px;"><i on-click={() => this.update(data)} class="el-icon-edit" title="修改"></i></span> : ''
          }

          {
            (data.flag === 1 || data.flag === 2) ? <span style="margin-left:8px;"><i on-click={() => this.delete(data)} class="el-icon-delete" title="删除"></i></span> : ''
          }
        </div>
      )
    },

    append (data) {
      this.addDialog = true
      this.nodeInfo = data
    },
    update (data) {
      this.editDialog = true
      this.nodeInfo = data
    },
    delete (data) {
      this.$confirm('是否删除选中的节点?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 请求删除节点api
        console.log(data);
      }).catch(err => console.log(err))
    },

    handleAddClose () {
      this.addDialog = false
    },

    handleEditClose () {
      this.editDialog = false
    }
  }
}
</script>

<style scoped>
.el-tree >>> .el-tree__empty-block {
  width: 200px;
}

.el-tree >>> .el-tree-node > .el-tree-node__content {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #666666;
}

.el-tree >>> .el-tree-node.is-current > .el-tree-node__content {
  background-color: #e6f8ff !important;
  color: #017cd9 !important;
}
</style>

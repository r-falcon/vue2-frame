<script type="text/jsx">
export default {
  name: 'TreeTemplate',
  props: {
    treeData: {
      required: true,
      type: Array,
      default: () => []
    },
    isExpandAll: {
      type: Boolean,
      default: () => false
    },
    isChecked: {
      type: Boolean,
      default: () => false
    },
    // el-table prop
    total: {
      type: Number,
      default: () => 0
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    columns: {
      type: Array,
      default: () => []
    },
    dataSource: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: Object,
      default: () => ({
        pageNum: 1,
        pageSize: 10
      })
    },
    paginationAlign: {
      type: String,
      default: () => 'right'
    }
  },
  data () {
    return {
      defaultProps: { children: 'children', label: 'label' },
      expandKeys: [],
      backupExpandKeys: [],
      checkedKeys: [],
      inputValue: ''
    }
  },
  methods: {
    onChange (e) {
      this.inputValue = e
      if (this.inputValue === '') {
        this.expandKeys = []
      } else {
        this.expandKeys = []
        this.backupExpandKeys = []
        // 获取满足搜索条件的所有节点id
        let candiateKeyList = this.getKeyList(this.inputValue, this.treeData, [])
        candiateKeyList.map(item => {
          // 获取每个满足搜索条件的节点的父节点
          var key = this.getParentKey(item, this.treeData)
          // 当item为最高一级，不放入数组；并且如果节点的父节点已经存在于数据中，也不放入数组
          if (key && !this.backupExpandKeys.some(item => item === key)) {
            this.backupExpandKeys.push(key)
          }
        })
        // 获取该节点的所有祖先节点
        for (let i = 0; i < this.backupExpandKeys.length; i++) {
          this.getAllParentKey(this.backupExpandKeys[i], this.treeData)
        }
        this.expandKeys = this.backupExpandKeys.slice()
      }
    },

    // 获取所有关键字涉及到的节点
    getKeyList (value, tree, keyList) {
      for (let i = 0; i < tree.length; i++) {
        let node = tree[i]
        if (node.label.indexOf(value) > -1) {
          keyList.push(node.id)
        }
        if (node.children) {
          this.getKeyList(value, node.children, keyList)
        }
      }
      return keyList
    },

    // 获取涉及到节点的所有父节点
    getParentKey (key, tree) {
      let parentKey, temp;
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i]
        if (node.children) {
          if (node.children.some(item => item.id === key)) {
            parentKey = node.id
          } else if (temp = this.getParentKey(key, node.children)) {
            parentKey = temp
          }
        }
      }
      return parentKey
    },

    // 获取该节点的所有祖先节点
    getAllParentKey (key, tree) {
      var parentKey;
      if (key) {
        parentKey = this.getParentKey(key, tree)
        if (parentKey) {
          if (!this.backupExpandKeys.some(item => item === parentKey)) {
            this.backupExpandKeys.push(parentKey)
          }
          this.getAllParentKey(parentKey, tree)
        }
      }
    },

    // 渲染函数
    renderContent (h, { node, data }) {
      return (
        <div>
          {
            (this.inputValue.length > 0 && node.label.indexOf(this.inputValue) !== -1) ? <span style="color:red;">{node.label}</span> : <span>{node.label}</span>
          }
        </div>
      )
    },

    // el-table 设计函数
    onPaginationChange ({ page, limit }) {
      this.$emit('paginationChange', { page, limit });
    },

    onSelectionChange (selection) {
      this.$emit('selectionChange', selection);
    },

    arraySpanMethod (col) {
      this.$emit('span-method', col);
    }
  },
  render (h) {
    return (
      <div>
        <el-row gutter={8}>
          <el-col span={6}>
            <el-input v-model={this.inputValue} placeholder="请输入要搜索的内容" onInput={this.onChange}></el-input>

            <el-tree
              node-key="id"
              props={this.defaultProps}
              data={this.treeData}
              default-expand-all={this.isExpandAll}
              default-expanded-keys={this.expandKeys}
              show-checkbox={this.isChecked}
              default-checked-keys={this.checkedKeys}
              render-content={this.renderContent}
            />
          </el-col>

          <el-col span={18}>
              <el-table
                {...{
                  props: this.$attrs
                }}
                v-loading={this.loading}
                data={this.dataSource}
                span-method={this.arraySpanMethod}
                on-selection-change={this.onSelectionChange}
              >
                {
                  this.columns.map(({ title, dataIndex, render, align = 'center', ...rest }) => {
                    return rest.type ? (
                      <el-table-column
                        label={title}
                        align={align}
                        type={rest.type}
                        width={rest.width}
                      />
                    ) : (
                      <el-table-column
                        {...{
                          props: {
                            ...rest
                          }
                        }}
                        align={align}
                        label={title}
                        prop={dataIndex}
                        formatter={(row, column, cellValue, index) => {
                          return render ? render(row, column, cellValue, index) : cellValue;
                        }}
                      />
                    );
                  })
                }
              </el-table>
              <pagination
                hidden={!this.total}
                total={this.total}
                page={this.pagination.pageNum}
                limit={this.pagination.pageSize}
                onPagination={this.onPaginationChange}
              />
          </el-col>
        </el-row>
      </div>
    )
  },
}
</script>

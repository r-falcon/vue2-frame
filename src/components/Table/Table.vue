<script type="text/jsx">
export default {
  name: 'Table',
  props: {
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
  methods: {
    onPaginationChange({ page, limit }) {
      this.$emit('paginationChange', { page, limit });
    },
    onSelectionChange(selection) {
      this.$emit('selectionChange', selection);
    },
    arraySpanMethod(col) {
      this.$emit('span-method', col);
    }
  },
  render(h) {
    return (
      <div>
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
      </div>
    );
  }
};
</script>

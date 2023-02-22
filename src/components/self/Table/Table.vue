<template>
  <div>
    <el-table
      ref="lTable"
      v-loading="loading"
      v-bind="$attrs"
      :data="dataSource"
      v-on="$listeners"
      @selection-change="selectionChange"
    >
      <el-table-column
        v-for="col in columnsFormat"
        :key="col.dataIndex"
        v-bind="col"
        :prop="col.dataIndex"
        :label="col.title"
        :width="col.width"
      ></el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page="pagination.pageNum"
      :limit="pagination.pageSize"
      @pagination="onPaginationChange"
    />
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    total: {
      type: Number,
      default: () => 0,
    },
    loading: {
      type: Boolean,
      default: () => false,
    },
    columns: {
      type: Array,
      default: () => [],
    },
    dataSource: {
      type: Array,
      default: () => [],
    },
    pagination: {
      type: Object,
      default: () => ({
        pageNum: 1,
        pageSize: 10,
      }),
    },
    paginationAlign: {
      type: String,
      default: () => "right",
    },
    tableName: {
      type: String,
      default: () => "",
    },
  },
  computed: {
    columnsFormat: function () {
      return this.columns.map((item) => {
        return {
          ...item,
          type: item.type || undefined,
          formatter: this.setColumnFormatter(item),
        };
      });
    },
  },
  methods: {
    setColumnFormatter(col) {
      if (col.type) {
        return undefined;
      } else {
        return (row, column, cellValue, index) => {
          return col.render
            ? col.render(row, cellValue, index, column)
            : cellValue;
        };
      }
    },
    onPaginationChange({ page, limit }) {
      this.$emit("pagination-change", { page, limit });
    },
    selectionChange(val) {
      this.$emit("selection-change", val, this.$refs.lTable);
    },
    arraySpanMethod(col) {
      this.$emit("spanMethod", col);
    },
  },
};
</script>

<template>
  <div class="app-container">
    <Table
      :total="total"
      strip
      border
      :columns="tableColumns"
      :data-source="tableData"
      :pagination="{
        pageNum: queryParams.pageNum,
        pageSize: queryParams.pageSize,
      }"
      :cell-style="cellStyle"
      :span-method="arraySpanMethod"
      @pagination-change="onPaginationChange"
    />
  </div>
</template>

<script>
import res from './service'
import { Table } from '@/components/Table'

const queryParams = {
  pageNum: 1,
  pageSize: 5
}

export default {
  name: 'TablePagination',
  components: {
    Table
  },
  data () {
    return {
      tableData: res.data,
      queryParams,
      total: 7,
      tableColumns: [
        {
          title: '序号',
          type: 'index',
          width: 50
        },
        { title: '姓名', dataIndex: 'username' },
        { title: '邮箱', dataIndex: 'email' },
        {
          title: '性别', dataIndex: 'sex', render: record => {
            if (record.sex === '0') return (<el-tag type="primary">男</el-tag>);
            else return (<el-tag type="danger">女</el-tag>)
          }
        },
        {
          title: '启用状态', dataIndex: 'enable', render: record => {
            return (<el-switch v-model={record.enable}></el-switch>)
          }
        },
        { title: '部门', dataIndex: 'dept' },
        { title: '职业', dataIndex: 'occupation' },
        { title: '爱好', dataIndex: 'hobby', render: record => record.hobby || '暂无' },
        { title: '创建日期', dataIndex: 'createTime',render:record => this.parseTime(record.createTime) || ''},
        {title:'操作',dataIndex:'option', width: 200,
          render: (record) => {
            return (
              <span>
                <el-button type="text" onClick={() => this.handleUpdate(record)}>修改</el-button>
                <el-button type="text" onClick={() => this.handleDelete(record)}>删除</el-button>
                <el-button type="text" onClick={() => this.handleReview(record)}>详情</el-button>
              </span>
            );
          }}
      ],
      cellStyle ({ row, rowIndex }) {
        if (rowIndex % 2 === 0) {
          return {
            backgroundColor: '#ffffff'
          }
        } else {
          return {
            backgroundColor: '#F9FCFF'
          }
        }
      },
      arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 1) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
    }
  },
  methods: {
    onPaginationChange ({ page, limit }) {
      this.queryParams = {
        ...this.queryParams,
        pageNum: page,
        pageSize: limit
      };
      console.log(this.queryParams);
      // this.getList();
    },
    handleUpdate(record){
      console.log(record);
    },
    handleDelete(record){
      console.log(record);
    },
    handleReview(record){
      console.log(record);
    }
  }
}
</script>
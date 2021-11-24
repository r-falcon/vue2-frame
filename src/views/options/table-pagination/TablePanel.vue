<template>
  <div class="app-container">
    <div style="display: flex; flex-direction: column">
      <el-button v-print="printObj">打印</el-button>

      <Table
        id="printMe"
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
        { title: '创建日期', dataIndex: 'createTime', render: record => this.parseTime(record.createTime) || '' },
        {
          title: '操作', dataIndex: 'option', width: 200,
          render: (record) => {
            return (
              <span>
                <el-button type="text" onClick={() => this.handleUpdate(record)}>修改</el-button>
                <el-button type="text" onClick={() => this.handleDelete(record)}>删除</el-button>
                <el-button type="text" onClick={() => this.handleReview(record)}>详情</el-button>
              </span>
            );
          }
        }
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
      },
      // 打印相关设置
      printObj: {
        id: "printMe",    // 这里是要打印元素的ID
        popTitle: '打印标题',  // 打印的标题
        // extraCss: '',  // 打印可引入外部的一个 css 文件
        // extraHead: '打印头部标题'  // 打印头部文字
        extraCss: "https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css",
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
        beforeOpenCallback (vue) {
          vue.printLoading = true
          console.log('打开之前')
        },
        openCallback (vue) {
          vue.printLoading = false
          console.log('执行了打印')
        },
        closeCallback (vue) {
          console.log('关闭了打印工具')
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
    handleUpdate (record) {
      console.log(record);
    },
    handleDelete (record) {
      console.log(record);
    },
    handleReview (record) {
      console.log(record);
    }
  }
}
</script>

<style lang="scss" scoped>
/*去除页眉页脚*/
@page {
  size: auto; /* auto is the initial value */
  margin: 3mm; /* this affects the margin in the printer settings */
}

html {
  background-color: #ffffff;
  margin: 0; /* this affects the margin on the html before sending to printer */
}

body {
  border: solid 1px blue;
  margin: 10mm 15mm 10mm 15mm; /* margin you want for the content */
}
/*去除页眉页脚*/
</style>
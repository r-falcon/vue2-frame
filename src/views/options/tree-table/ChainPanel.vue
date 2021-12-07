<template>
  <div class="app-container">
    <TreeTemplate
      :treeData="treeData"
      :data-source="tableData"
      :total="total"
      :columns="tableColumns"
      :pagination="{
        pageNum: queryParams.pageNum,
        pageSize: queryParams.pageSize,
      }"
    />
  </div>
</template>

<script>
import { TreeTemplate } from '@/components/Table'

const queryParams = {
  pageNum: 1,
  pageSize: 5
}


export default {
  components: {
    TreeTemplate
  },
  data () {
    return {
      treeData: [
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
                  label: '子子级3-1'
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
                  children: [
                    {
                      id: 41,
                      label: '子子子级4-1'
                    }
                  ]
                },
                {
                  id: 33,
                  label: '子子级3-3'
                },
              ]
            },
            {
              id: 23,
              label: '子级2-3'
            }
          ]
        },
        {
          id: 12,
          label: '父级1-2'
        }
      ],
      tableColumns: [
        {
          title: '序号',
          type: 'index',
          width: 50
        },
        {
          title: '姓名',
          dataIndex: 'username'
        },
        {
          title: '年龄',
          dataIndex: 'age'
        },
        {
          title: '电话',
          dataIndex: 'phoneNumber'
        },
       {
          title: '操作', dataIndex: 'option', width: 200,
          render: (record, column, cellValue, index) => {
            return (
              <span>
                <el-button type="text" onClick={() => this.handleReview(record)}>详情</el-button>
              </span>
            );
          }
        }
      ],
      tableData: [
        {
          id: 1,
          username: 'falcon',
          age: 21,
          phoneNumber: '13245870963'
        },
        {
          id: 2,
          username: 'alice',
          age: 19,
          phoneNumber: '13245870924'
        },
      ],
      queryParams,
      total: 2
    }
  },

  methods: {
    handleReview (record) {
      console.log(record);
    }
  }
}
</script>
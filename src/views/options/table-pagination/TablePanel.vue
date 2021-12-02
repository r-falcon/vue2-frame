<template>
  <div class="app-container">
    <span style="float: right; margin: 10px">
      <el-button v-print="printObj">打印</el-button>
      <el-button @click="handleAdd">新增</el-button>
    </span>

    <Table
      id="printMe"
      style="margin-top: 20px"
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

    <!-- 修改对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="800px"
      center
      append-to-body
      :before-close="updatecancel"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名:" prop="username">
              <el-input v-model="form.username" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="邮箱:" prop="email">
              <el-input v-model="form.email" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="性别:" prop="sex">
              <el-radio-group v-model="form.sex">
                <el-radio :label="'0'">男</el-radio>
                <el-radio :label="'1'">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="启用状态:" prop="enable">
              <el-radio-group v-model="form.enable">
                <el-radio :label="true">启用</el-radio>
                <el-radio :label="false">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="部门:" prop="dept">
              <treeselect
                v-model="form.dept"
                placeholder="请选择部门"
                :options="treeData"
                @input="() => onDeptInput('dept')"
                @select="handleSelect"
              ></treeselect>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="职业:" prop="occupation">
              <el-input v-model="form.occupation" placeholder="请输入职业" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="爱好:" prop="hobby">
              <el-input v-model="form.hobby" placeholder="请输入职业" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="updatecancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 详情对话框 -->
    <el-dialog
      title="详细"
      :visible.sync="carefulOpen"
      center
      width="800px"
      append-to-body
      :before-close="carefulcancel"
    >
      <el-form :model="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名:">
              {{ form.username }}
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="邮箱:">
              {{ form.email }}
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="性别:">
              {{ form.sex === "0" ? "男" : "女" }}
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="启用状态:">
              {{ form.enable === true ? "启用" : "停用" }}
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="部门:">
              {{ form.deptName }}
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="职业:">
              {{ form.occupation }}
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="爱好:">
              {{ form.hobby === "" ? "暂无" : form.hobby }}
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="创建日期:">
              {{ parseTime(form.createTime) }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="carefulcancel">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import res from './service'
import { Table } from '@/components/Table'
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

const queryParams = {
  pageNum: 1,
  pageSize: 5
}

export default {
  name: 'TablePagination',
  components: {
    Table,
    Treeselect
  },
  data () {
    return {
      tableData: res.data,
      treeData: res.treeData,
      queryParams,
      total: res.data.length,
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
        { title: '部门', dataIndex: 'deptName' },
        { title: '职业', dataIndex: 'occupation' },
        { title: '爱好', dataIndex: 'hobby', render: record => record.hobby || '暂无' },
        { title: '创建日期', dataIndex: 'createTime', render: record => this.parseTime(record.createTime) || '' },
        {
          title: '操作', dataIndex: 'option', width: 200,
          render: (record, column, cellValue, index) => {
            return (
              <span>
                <el-button type="text" onClick={() => this.handleUpdate(record)}>修改</el-button>
                <el-button type="text" onClick={() => this.handleReview(record)}>详情</el-button>
                {
                  this.tableData.length > 1 ? (
                    <el-popconfirm
                      style={{ marginLeft: '10px' }}
                      title="确定要删除此项数据吗？"
                      onConfirm={() => this.handleDelete(index,column,record)}
                    >
                      <el-button slot="reference" type="text">删除</el-button>
                    </el-popconfirm>
                  ) : null
                }
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
        // beforeOpenCallback (vue) {
        //   vue.printLoading = true
        //   console.log('打开之前')
        // },
        // openCallback (vue) {
        //   vue.printLoading = false
        //   console.log('执行了打印')
        // },
        // closeCallback (vue) {
        //   console.log('关闭了打印工具')
        // }
      },
      // 弹框相关控制
      open: false,
      carefulOpen: false,
      // 表单
      title: '新增',
      editModel: {},
      form: {},
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
        ],
        sex: [
          { required: true, message: '性别不能为空', trigger: 'change' },
        ],
        enable: [
          { required: true, message: '启用状态不能为空', trigger: 'change' },
        ],
        dept: [
          { required: true, message: '部门不能为空', trigger: 'input' },
        ],
        occupation: [
          { required: true, message: '职业不能为空', trigger: 'blur' },
        ],
        hobby: [
          { required: true, message: '爱好不能为空', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    // 树形结构选择器重置表单校验状态
    onDeptInput (key) {
      this.$refs['form'].validateField(key)
    },
    // 遇到键值对类型的数据需要修改时【1.前端key，value一并传入后台，后台原样返回；2.前端传入key，后台连表查询返回key，value】
    handleSelect (value) {
      this.form.deptName = value.label
    },

    onPaginationChange ({ page, limit }) {
      this.queryParams = {
        ...this.queryParams,
        pageNum: page,
        pageSize: limit
      };
      console.log(this.queryParams);
      // this.getList();
    },
    handleAdd () {
      this.reset()
      this.title = '新增'
      this.open = true
    },

    handleUpdate (record) {
      this.reset()
      this.title = '修改'
      this.form = record
      this.open = true
    },
    updatecancel () {
      this.reset()
      this.open = false
    },
    submitForm () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          console.log(this.form);
          if(this.title === '新增'){
            this.form.id = this.form.length+1
            this.tableData.push(this.form)
            console.log('add',this.tableData);
          }else{
            this.tableData.forEach(item => {
              if(item.id === this.form.id){
                item = this.form
              }
            })
            console.log('update',this.tableData);
          }
          // this.reset()
          this.open = false
        }
      })
    },


    handleReview (record) {
      this.reset()
      this.form = record
      this.carefulOpen = true
    },
    carefulcancel () {
      this.reset()
      this.carefulOpen = false
    },

    handleDelete (index,column,record) {
      console.log('column',column);
      console.log('delete', record.id);
      const tempData = [...this.tableData]
      tempData.splice(index, 1)
      this.tableData = [...tempData]
    },

    // 表单重置
    reset () {
      this.form = {}
      // 运用了公共的表单重置方法
      this.resetForm("form")
    }
  }
}
</script>

<style lang="scss" scoped>
.el-col {
  text-align: left;
}
</style>
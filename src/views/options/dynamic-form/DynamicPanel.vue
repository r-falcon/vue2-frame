<template>
  <div class="app-container">
    <el-form ref="form" :model="tableObj">
      <el-table
        :data="tableObj.tableData"
        style="width: 100%"
        :header-cell-style="{
          background: '#3d80f2',
          color: '#fff',
          fontSize: '14px',
          height: '40px',
        }"
      >
        <el-table-column
          prop="numbering"
          label="编号"
          align="center"
        ></el-table-column>
        <el-table-column prop="title" label="标题" align="center">
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.title'"
              :rules="rules.title"
            >
              <el-input
                v-model="scope.row.title"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="数量" align="center">
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.number'"
              :rules="rules.number"
            >
              <el-input
                v-model="scope.row.number"
                type="number"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" align="center">
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.type'"
              :rules="rules.type"
            >
              <el-select
                v-model="scope.row.type"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="addClick">新增</el-button>
            <el-button
              type="text"
              style="color: red"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-form>

    <div style="text-align: center; margin-top: 20px">
      <el-button type="primary" size="mini" @click="handleSubmit"
        >提交</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableObj: {
        tableData: [
          {
            numbering: "编号-1",
            title: "",
            number: '',
            type: '',
            status: true,
          }
        ]
      },
      rules: {
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
        number: [{ required: true, message: "数量不能为空", trigger: "blur" }],
        type: [{ required: true, message: "类型不能为空", trigger: "change" }]
      },
      options: [
        {
          id: 1,
          label: '类型1'
        }, {
          id: 2,
          label: '类型2'
        }, {
          id: 3,
          label: '类型3'
        }
      ]
    }
  },

  methods: {
    //新增方法
    addClick () {
      this.valNumer = this.valNumer + 1;
      var list = {
        numbering: "编号" + `-${this.tableObj.tableData.length + 1}`,
        title: this.title,
        type: this.type,
        status: this.status
      };
      this.tableObj.tableData.push(list);
    },
    //删除新增的某行数据
    handleDelete (index, row) {
      this.tableObj.tableData.splice(index, 1);
      for (var i = index; i < this.tableObj.tableData.length; i++) {//从某一行删除了编号，删除的编号后面的编号数据要依次减一，所以遍历删除编号后面的数据
        this.tableObj.tableData[i].numbering = "编号" + `-${Number(this.tableObj.tableData[i].numbering.split("-")[1]) - 1}`;
      }
    },

    handleSubmit () {
      console.log('submit');
      this.$refs["form"].validate(valid => {
        if (valid) {
          console.log('valid');
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.dialogDiv {
  height: 300px;
  overflow: auto;
}
</style>

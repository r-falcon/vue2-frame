<template>
  <div class="app-container">
    <el-table
      :data="tableData"
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
          <el-input v-model="scope.row.title" placeholder="请输入"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" align="center">
        <template slot-scope="scope">
          <el-select v-model="scope.row.type" placeholder="请选择" clearable>
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="sortName" label="分类" align="center">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.sortName"
            placeholder="分类"
            @focus="handleFocus(scope.$index, scope.row)"
          ></el-input>
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

    <el-dialog
      title="分类选择"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
      append-to-body
    >
      <div>
        <h3>请选择分类:</h3>
        <el-checkbox-group v-model="checkList">
          <el-checkbox
            v-for="item in orderList"
            :key="item.id"
            :label="item.id"
            >{{ item.label }}</el-checkbox
          >
        </el-checkbox-group>
      </div>

      <div>
        <h3>所属分类为：</h3>
        <span v-for="(item, index) in checkList" :key="index"
          >{{ orderObj[item] }}
        </span>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="text" @click="handleClose">取 消</el-button>
        <el-button type="primary" size="mini" @click="handleSubmit"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          numbering: "编号-1",
          title: "",
          type: '',
          sortName: '',
          sortList: '',
          status: true,
        }
      ],
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
      ],
      dialogVisible: false,
      index: null,
      checkList: [],
      checkOrder: [],
      orderList: [
        {
          id: 0,
          label: 'shopping'
        },
        {
          id: 1,
          label: 'singing'
        },
        {
          id: 2,
          label: 'cooking'
        },
        {
          id: 3,
          label: 'dancing'
        },
        {
          id: 4,
          label: 'reading'
        }
      ],
      orderObj: ['shopping', 'singing', 'cooking', 'dancing', 'reading'],
      checkAllList: []
    }
  },

  methods: {
    handleFocus (index, row) {
      this.index = index
      this.dialogVisible = true

      if (this.checkAllList[this.index] === undefined) {
        this.checkList = []
      } else {
        this.checkList = this.checkAllList[this.index]
      }
    },

    handleClose () {
      this.checkOrder = []
      this.dialogVisible = false
    },

    handleSubmit () {
      console.log('submit');
      this.checkList.forEach(item => {
        this.checkOrder.push(this.orderObj[item])
      })

      this.checkAllList[this.index] = this.checkList
      this.tableData[this.index].sortList = this.checkList.join(',')
      this.tableData[this.index].sortName = this.checkOrder.join(',')
      this.dialogVisible = false
      this.checkOrder = []
    },

    //新增方法
    addClick () {
      this.valNumer = this.valNumer + 1;
      var list = {
        numbering: "编号" + `-${this.tableData.length + 1}`,
        title: this.title,
        type: this.type,
        sortName: this.sortName,
        sortList: this.sortList,
        status: this.status
      };
      this.tableData.push(list);
    },
    //删除新增的某行数据
    handleDelete (index, row) {
      this.tableData.splice(index, 1);
      for (var i = index; i < this.tableData.length; i++) {//从某一行删除了编号，删除的编号后面的编号数据要依次减一，所以遍历删除编号后面的数据
        this.tableData[i].numbering = "编号" + `-${Number(this.tableData[i].numbering.split("-")[1]) - 1}`;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.dialogDiv {
  height: 300px;
  overflow: auto;
}

.el-checkbox {
  margin: 0 10px 5px 10px;
}
</style>

<template>
  <div class="app-container">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            :disabled="scope.$index === 0"
            @click="moveUp(scope.$index, scope.row)"
            ><i class="el-icon-arrow-up"></i
          ></el-button>
          <el-button
            size="mini"
            type="text"
            :disabled="scope.$index === tableData.length - 1"
            @click="moveDown(scope.$index, scope.row)"
            ><i class="el-icon-arrow-down"></i
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '第一行',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '第二行',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '第三行',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '第四行',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },

  methods: {
    //上移
    moveUp (index, row) {
      var that = this;
      if (index > 0) {
        let upDate = that.tableData[index - 1];
        that.tableData.splice(index - 1, 1);
        that.tableData.splice(index, 0, upDate);
      } else {
        alert('已经是第一条，不可上移');
      }
    },

    //下移
    moveDown (index, row) {
      var that = this;
      if ((index + 1) === that.tableData.length) {
        alert('已经是最后一条，不可下移');
      } else {
        let downDate = that.tableData[index + 1];
        that.tableData.splice(index + 1, 1);
        that.tableData.splice(index, 0, downDate);
      }
    }
  }
}
</script>

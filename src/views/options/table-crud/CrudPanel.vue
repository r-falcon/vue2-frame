<template>
  <div class="app-container">
    <el-card>
      <div class="input_box">
        <div>
          <el-input
            placeholder="请输入搜索内容"
            class="input_con"
            clearable
            v-model="searchValue"
          />
          <el-button icon="el-icon-search" class="input_btn" @click="search" />
          <el-button
            style="margin-left: 10px"
            icon="el-icon-refresh"
            class="input_btn"
            @click="refresh"
          />
        </div>

        <el-button type="primary" @click="handleAdd"> + 房屋信息 </el-button>
      </div>

      <el-table
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%; margin-top: 30px"
      >
        <el-table-column align="center" type="index" label="序号" width="60" />
        <el-table-column align="center" label="房屋名称" prop="houseName" />
        <el-table-column align="center" label="房屋简介" prop="houseShort" />
        <el-table-column align="center" label="房屋位置" prop="housePosition" />
        <el-table-column align="center" label="房屋类型" prop="houseType">
          <template slot-scope="scope">
            {{ FWLX[scope.row.houseType] }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="房屋面积（平方米）"
          prop="houseArea"
        />
        <el-table-column align="center" label="房屋拥有者" prop="houseOwner" />
        <el-table-column
          align="center"
          label="房屋拥有者电话"
          prop="houseOwnerPhone"
        />
        <el-table-column
          align="center"
          label="房屋导航信息"
          prop="houseNavInfo"
        />
        <el-table-column
          align="center"
          label="房屋维护用户"
          prop="houseKeeper"
        />
        <el-table-column align="center" label="当前状态" prop="status">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.status"
              :type="scope.row.status | statusFilter"
            >
              {{ DQZT[scope.row.status] }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              type="info"
              size="mini"
              icon="el-icon-view"
              @click="handleView(scope.row)"
              >查看</el-button
            >
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.page"
        :limit.sync="queryParams.limit"
        @pagination="initList"
      />
    </el-card>

    <page-option
      ref="opt"
      :isAdd="show.isAdd"
      :visible="show.visible"
      @submit="handleSubmit"
      @close="handleClose"
    ></page-option>

    <page-view ref="vw" :visible="viewVisible" @close="handleViewClose" />
  </div>
</template>

<script>
import commonMixin from '@/views/mixin'
import pageOption from './pageOption.vue'
import pageView from './pageView.vue'

export default {
  mixins: [commonMixin],
  components: {
    pageOption,
    pageView
  },
  filters: {
    statusFilter (value) {
      let mapStatus = {
        2: 'success',
        3: 'danger'
      }
      return mapStatus[value]
    }
  },
  data () {
    return {
      searchValue: '',
      saveData: [],

      loading: false,

      tableData: [{
        id: 1,
        houseName: '万科生态之光',
        houseShort: '别名锦城苑',
        housePosition: '滨海新区-中新生态城-航帆道与顺平路交口',
        houseType: '1',
        houseArea: '120',
        houseOwner: '张三',
        houseOwnerPhone: '13345670829',
        houseNavInfo: '航帆道与顺平路交口',
        houseKeeper: '张三',
        status: 1, // 待售 在售 已售出
      }],
      queryParams: {
        page: 1,
        limit: 10
      },
      total: 0,

      show: {
        isAdd: false,
        visible: false
      },

      viewVisible: false
    }
  },
  mounted () {
    this.initList()
  },
  methods: {
    initList () {
      this.loading = true
      this.total = this.tableData.length
      this.loading = false
    },

    handleAdd () {
      this.show.isAdd = true
      this.show.visible = true
    },

    handleEdit (record) {
      this.$refs.opt.editUser(record)
      this.show.isAdd = false
      this.show.visible = true
    },

    handleSubmit (record) {
      if (this.show.isAdd) {
        record = { ...record, id: this.tableData.length + 1 }
        this.tableData.push(record)
        this.saveData = this.tableData
        this.initList()
        this.reset()
        this.$message.success('添加成功')
      } else {
        this.tableData = this.filterData(this.tableData, record.id)
        this.tableData.push({ ...record })
        this.saveData = this.tableData
        this.initList()
        this.reset()
        this.$message.success('修改成功')
      }
    },

    handleClose () {
      this.reset()
    },

    reset () {
      this.show.isAdd = false
      this.show.visible = false
    },

    handleView (record) {
      this.viewVisible = true
      this.$refs.vw.viewInfo(record)
    },

    handleViewClose () {
      this.viewVisible = false
    },

    handleDelete (record) {
      this.$confirm(
        '此操作将永久删除该条数据，是否继续？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var list = this.filterData(this.tableData, record.id)
          this.tableData = list
          this.saveData = this.tableData
          this.$message.success('删除成功')
          this.initList()
        }).catch((err) => {
          console.log(err);
          this.$message.error('删除失败')
        })
    },

    filterData (list, id) {
      return list.filter(
        item => item.id !== id
      )
    },

    search () {
      this.saveData = this.tableData
      this.tableData = this.queryMethod(this.tableData, this.searchValue)
      this.searchValue = ''
      this.initList()
    },

    /**
    * 使用indexof方法实现模糊查询
    * @param  {Array}  list     进行查询的数组
    * @param  {String} keyWord  查询的关键词
    * @return {Array}           查询的结果
    */
    queryMethod (list, keyWord) {
      var arr = [];
      for (var i = 0; i < list.length; i++) {
        if (list[i].houseName.indexOf(keyWord) >= 0) {
          arr.push(list[i]);
        }
      }
      return arr;
    },

    refresh () {
      this.tableData = this.saveData
      this.initList()
    }
  }
}
</script>

<style lang="scss" scoped>
.input_box {
  display: flex;
  justify-content: space-between;

  .input_con {
    width: 300px;
    border-radius: 1px solid #ccc;
  }

  .input_btn {
    background: #f2f7f8;
    margin-left: -5px;
  }
}
</style>
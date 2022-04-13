<template>
  <div>
    <el-dialog
      title="房屋信息详情"
      :visible.sync="itemVisible"
      width="60%"
      @close="onClose"
    >
      <el-row>
        <el-col :span="12"> 房屋名称：{{ form.houseName }} </el-col>
        <el-col :span="12"> 房屋简介：{{ form.houseShort }} </el-col>
        <el-col :span="12"> 房屋位置：{{ form.housePosition }} </el-col>
        <el-col :span="12"> 房屋类型：{{ FWLX[form.houseType] }} </el-col>
        <el-col :span="12"> 房屋面积：{{ form.houseArea }}平方米 </el-col>
        <el-col :span="12"> 房屋拥有者电话：{{ form.houseOwnerPhone }} </el-col>
        <el-col :span="12"> 房屋导航信息：{{ form.houseNavInfo }} </el-col>
        <el-col :span="12"> 房屋维护用户：{{ form.houseKeeper }} </el-col>
        <el-col :span="12"> 房屋当前状态：{{ DQZT[form.status] }} </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onClose">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import commonMixin from '@/views/mixin'

export default {
  mixins: [commonMixin],
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    itemVisible: {
      get: function () {
        return this.visible
      },
      set: function () { }
    }
  },

  data () {
    return {
      form: {}
    }
  },

  methods: {
    onClose () {
      this.$emit("close");
    },

    viewInfo (record) {
      this.form = { ...record }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row .el-col {
  margin: 10px 0;
}
</style>

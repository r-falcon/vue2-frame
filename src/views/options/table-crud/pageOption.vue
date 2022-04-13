<template>
  <div>
    <el-dialog
      :title="isAdd ? '录入房屋信息' : '修改房屋信息'"
      :visible.sync="itemVisible"
      width="60%"
      @close="onClose"
    >
      <el-row>
        <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
          <el-col :span="12">
            <el-form-item label="房屋名称" prop="houseName">
              <el-input v-model="form.houseName" placeholder="请输入房屋名称" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="房屋简介" prop="houseShort">
              <el-input
                v-model="form.houseShort"
                placeholder="请输入房屋简介"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="房屋位置" prop="housePosition">
              <el-input
                v-model="form.housePosition"
                placeholder="请输入房屋位置"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="房屋类型" prop="houseType">
              <el-select v-model="form.houseType" placeholder="请选择">
                <el-option
                  v-for="item in houseTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="房屋面积" prop="houseArea">
              <el-input-number
                v-model="form.houseArea"
                :precision="2"
                :min="0"
                :max="9999"
                placeholder="请输入房屋面积（平方米）"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="房屋拥有者" prop="houseOwner">
              <el-input
                v-model="form.houseOwner"
                placeholder="请输入房屋拥有者"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="房屋拥有者电话" prop="houseOwnerPhone">
              <el-input
                v-model="form.houseOwnerPhone"
                placeholder="请输入房屋拥有者电话"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="房屋导航信息" prop="houseNavInfo">
              <el-input
                v-model="form.houseNavInfo"
                placeholder="请输入房屋导航信息"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="房屋维护用户" prop="houseKeeper">
              <el-input
                v-model="form.houseKeeper"
                placeholder="请输入房屋维护用户"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="当前状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择">
                <el-option
                  v-for="item in currentList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import commonMixin from '@/views/mixin'

// var mobileReg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
// var validMobile = (rule, value, callback) => {
//   if (value !== "") {
//     if (!mobileReg.test(value)) {
//       callback(new Error("请输入正确的手机号码"));
//     } else {
//       callback();
//     }
//   }
// };


export default {
  props: {
    isAdd: {
      type: Boolean,
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  mixins: [commonMixin],
  data () {
    return {
      form: {},
      rules: {
        houseName: [
          { required: true, message: "房屋名称不能为空", trigger: "blur" }
        ],
        houseOwner: [
          { required: true, message: "房屋拥有者不能为空", trigger: "blur" }
        ],
        // houseOwnerPhone: [
        //   { validator: validMobile, trigger: "blur" }
        // ],
      }
    };
  },

  computed: {
    itemVisible: {
      get: function () {
        return this.visible
      },
      set: function () { }
    }
  },

  methods: {
    onClose () {
      this.$refs.formRef.resetFields()
      this.$emit("close");
    },

    editUser (record) {
      this.form = { ...record }
    },

    handleSubmit () {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          this.$emit('submit', this.form)
        }
      });
    }
  }
};
</script>

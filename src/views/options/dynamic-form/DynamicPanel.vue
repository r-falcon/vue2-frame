<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-form
        ref="form"
        :model="formData"
        label-position="left"
        label-width="80px"
      >
        <el-col :span="24">
          <el-form-item
            prop="fixTitle"
            label="标题"
            :rules="[
              { required: true, message: '请输入固定标题', trigger: 'blur' },
            ]"
          >
            <el-input v-model="formData.fixTitle" />
          </el-form-item>
        </el-col>

        <div v-for="(domain, index) in formData.domains" :key="domain.key">
          <el-col :span="6">
            <el-form-item
              label="姓名"
              :prop="'domains.' + index + '.name'"
              :rules="{
                required: true,
                message: '姓名不能为空',
                trigger: 'blur',
              }"
            >
              <el-input v-model="domain.name" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item
              label="年龄"
              :prop="'domains.' + index + '.age'"
              :rules="{
                required: true,
                message: '年龄不能为空',
                trigger: 'blur',
              }"
            >
              <el-input v-model="domain.age" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item
              label="类型"
              :prop="'domains.' + index + '.type'"
              :rules="{
                required: true,
                message: '类型不能为空',
                trigger: 'change',
              }"
            >
              <el-select v-model="domain.type" placeholder="请选择">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="2">
            <el-form-item
              label="状态"
              :prop="'domains.' + index + '.status'"
              :rules="{
                required: true,
                message: '状态不能为空',
                trigger: 'change',
              }"
            >
              <el-switch v-model="domain.status" />
            </el-form-item>
          </el-col>

          <el-col :span="1">
            <el-form-item>
              <el-button type="primary" @click="addDomain">增行</el-button>
            </el-form-item>
          </el-col>

          <el-col :span="1">
            <el-form-item>
              <el-button type="danger" @click="deleteDomain(domain)"
                >删除</el-button
              >
            </el-form-item>
          </el-col>
        </div>

        <el-col :span="24">
          <div style="display: flex; justify-content: center">
            <el-button type="primary" @click="handleSubmit('form')"
              >提交</el-button
            >
            <el-button @click="handleReset('form')">重重</el-button>
          </div>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        fixTitle: '',
        domains: [{}]
      },
      typeOptions: [
        {
          value: '1',
          label: '文学'
        },
        {
          value: '2',
          label: '教辅'
        },
        {
          value: '3',
          label: '政治'
        },
      ]
    }
  },
  methods: {
    handleSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('form', this.formData);
        }
      })
    },
    handleReset (formName) {
      this.$refs[formName].resetFields()
    },


    addDomain () {
      this.formData.domains.push({
        key: Date.now()
      })
    },
    deleteDomain (item) {
      var index = this.formData.domains.indexOf(item)
      // if (index !== -1) {
      if (index !== 0) {
        this.formData.domains.splice(index, 1)
      }
    }
  }
}
</script>

<style>
</style>
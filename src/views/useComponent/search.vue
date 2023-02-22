<template>
  <div class="app-container">
    <SearchPanel :model="form" @search="handleSearch" @reset="handleReset">
      <el-form-item label="账号" prop="username">
        <el-input
          type="text"
          v-model="form.username"
          placeholder="请输入用户名"
        />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
        />
      </el-form-item>
    </SearchPanel>
  </div>
</template>

<script>
import { SearchPanel } from "@/components/self/SearchPanel";

export default {
  name: "useSearch",
  components: { SearchPanel },
  data() {
    return {
      form: {},
    };
  },
  methods: {
    handleSearch(data) {
      this.form = data.formValue;
      console.log("search", this.form);
    },
    handleReset(data) {
      data.instance.resetFields();
    },
  },
};
</script>

<template>
  <el-form ref="searchForm" v-bind="$attrs" :model="model" v-on="$listeners">
    <slot />
    <el-form-item>
      <el-button
        class="filter-item"
        type="primary"
        @click="() => handleAction('search')"
        >查询</el-button
      >
      <el-button @click="() => handleAction('reset')">重置</el-button>
    </el-form-item>
    <slot
      name="action"
      :form="{ formValue: model, instance: $refs['searchForm'] }"
    />
  </el-form>
</template>

<script>
export default {
  name: "SearchPanel",
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleAction(type) {
      this.$emit(type, {
        formValue: this.model,
        instance: this.$refs["searchForm"],
      });
    },
  },
};
</script>

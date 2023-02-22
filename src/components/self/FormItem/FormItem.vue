<template>
  <el-form-item
    v-show="!config.hidden"
    :ref="config.prop"
    v-bind="$attrs"
    :label="config.label"
    :prop="config.prop"
  >
    <!-- 文本输入 -->
    <el-input
      v-if="config.type === 'text'"
      v-bind="$attrs"
      clearable
      :show-word-limit="config.showWordLimit"
      :maxlength="config.maxLength"
      :placeholder="placeholderFormatter"
      :value="formValue[config.prop]"
      :disabled="config.disabled"
      @input="handleChange"
    />

    <!-- 数值输入 -->
    <el-input-number
      v-if="config.type === 'number'"
      v-bind="$attrs"
      clearable
      style="width: 100%"
      :controls-position="config.controlsPosition"
      :min="config.min"
      :max="config.max"
      :placeholder="placeholderFormatter"
      :value="formValue[config.prop]"
      :disabled="config.disabled"
      @input="handleChange"
    />

    <!-- 多行文本输入 -->
    <el-input
      v-else-if="config.type === 'textarea'"
      v-bind="$attrs"
      type="textarea"
      clearable
      :rows="config.rows || 4"
      :show-word-limit="config.showWordLimit"
      :maxlength="config.maxLength"
      :placeholder="placeholderFormatter"
      :value="formValue[config.prop]"
      :disabled="config.disabled"
      @input="handleChange"
    />

    <!-- 下拉选 -->
    <el-select
      v-else-if="config.type === 'select'"
      v-bind="$attrs"
      style="width: 100%"
      clearable
      :popper-append-to-body="config.popperAppendToBody"
      :placeholder="placeholderFormatter"
      :value="formValue[config.prop]"
      :disabled="config.disabled"
      @change="handleChange"
    >
      <el-option
        v-for="item in config.options"
        :key="item.value"
        :value="item.value"
        :label="item.label"
      />
    </el-select>

    <!-- 单选框 -->
    <el-radio-group
      v-else-if="config.type === 'radio'"
      v-model="formValue[config.prop]"
      v-bind="$attrs"
      @change="handleChange"
    >
      <el-radio
        v-for="item in config.options"
        :key="item.value"
        :value="item.value"
        :label="item.value"
        >{{ item.label }}</el-radio
      >
    </el-radio-group>

    <!-- 多选框 -->
    <el-checkbox-group
      v-else-if="config.type === 'checkbox'"
      v-model="formValue[config.prop]"
      v-bind="$attrs"
      @change="handleChange"
    >
      <el-checkbox
        v-for="item in config.options"
        :key="item.value"
        :value="item.value"
        :label="item.value"
      />
    </el-checkbox-group>

    <!-- 日期选择 -->
    <!-- @input="handleChange" -->
    <el-date-picker
      v-else-if="config.type === 'datepicker'"
      clearable
      style="width: 100%"
      :value="formValue[config.prop]"
      :format="config.valueFormat"
      :value-format="config.valueFormat"
      :type="config.pickerType"
      :placeholder="placeholderFormatter"
      :disabled="config.disabled"
      :picker-options="config.pickerOptions"
      @input="handleChange"
    />

    <!-- 日期范围选择 -->
    <el-date-picker
      v-else-if="config.type === 'daterange'"
      clearable
      type="daterange"
      style="width: 100%"
      :disabled="config.disabled"
      :value="formValue[config.prop]"
      :value-format="config.valueFormat"
      :placeholder="placeholderFormatter"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @input="config.onInput"
    />

    <!-- 图片上传 -->
    <el-upload
      v-else-if="
        config.type === 'upload' &&
        config.uploadType === 'image' &&
        config.listType !== 'picture-card'
      "
      :ref="config.prop"
      :class="[
        {
          upload: config.listType !== 'picture-card',
        },
      ]"
      :action="config.uploadUrl"
      :list-type="config.listType"
      :drag="config.draggable"
      :headers="config.uploadHeaders"
      :show-file-list="config.showFileList"
      :file-list="config.fileList"
      :on-success="config.onSuccess"
      :before-upload="config.beforeUpload"
      :on-preview="config.onPreview"
      :on-remove="config.onRemove"
      :data="config.data"
      :style="{
        width: config.width,
        height: config.height,
        lineHeight: config.height,
      }"
      :disabled="config.disabled"
    >
      <img
        v-if="formValue[config.prop] && config.listType !== 'picture-card'"
        :src="config.fileUrl"
        class="upload_image"
      />
      <i v-else class="el-icon-plus avatar-uploader-icon" />
      <div
        v-show="config.tip"
        slot="tip"
        class="el-upload__tip"
        style="margin-top: -70px"
      >
        {{ config.tip }}
      </div>
    </el-upload>

    <!-- 照片墙 -->
    <el-upload
      v-else-if="
        config.type === 'upload' &&
        config.uploadType === 'image' &&
        config.listType === 'picture-card'
      "
      :ref="config.prop"
      class="pic-wall"
      :action="config.uploadUrl"
      :list-type="config.listType"
      :drag="config.draggable"
      :headers="config.uploadHeaders"
      :show-file-list="config.showFileList"
      :file-list="config.fileList"
      :on-success="config.onSuccess"
      :before-upload="config.beforeUpload"
      :on-preview="config.onPreview"
      :on-remove="config.onRemove"
    >
      <i class="el-icon-plus avatar-uploader-icon" />
      <slot slot="file" name="file" />
    </el-upload>

    <!-- 文件上传 -->
    <el-upload
      v-else-if="config.type === 'upload' && config.uploadType === 'file'"
      :action="config.uploadUrl"
      :drag="config.draggable"
      :headers="config.uploadHeaders"
      :show-file-list="config.showFileList"
      :multiple="config.multiple"
      :limit="config.limit"
      :file-list="config.fileList"
      :on-success="config.onSuccess"
      :before-upload="config.beforeUpload"
      :on-preview="config.onPreview"
      :on-remove="config.onRemove"
      :disabled="config.disabled"
    >
      <el-button size="small" type="primary" :disabled="config.disabled">{{
        config.disabled ? "点击文件名查看" : "点击上传"
      }}</el-button>
      <div
        v-show="config.tip"
        slot="tip"
        class="el-upload__tip"
        style="margin-top: -100px; margin-left: 50px"
      >
        {{ config.tip }}
      </div>
    </el-upload>

    <!-- 富文本 -->
    <Editor
      v-else-if="config.type === 'rich'"
      ref="quill"
      v-model="richData"
      :height="config.height"
    />

    <!-- 开关 -->
    <el-switch
      v-else-if="config.type === 'switch'"
      :disabled="config.disabled"
      :value="formValue[config.prop]"
      @change="handleChange"
    />

    <!-- 级联选择器 -->
    <el-cascader
      v-else-if="config.type === 'cascader'"
      clearable
      style="width: 100%"
      :disabled="config.disabled"
      :value="formValue[config.prop]"
      :options="config.options"
      :placeholder="placeholderFormatter"
      :props="config.props"
      @change="handleChange"
    />

    <!-- 自定义内容 -->
    <slot name="extra" />
  </el-form-item>
</template>

<script>
export default {
  name: "FormItem",
  props: {
    formValue: {
      type: Object,
      default: () => {},
    },
    config: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      richData: null,
    };
  },
  computed: {
    placeholderFormatter: function () {
      if (this.config.placeholder) {
        return this.config.placeholder;
      }
      const isTextField = ["text", "textarea"].includes(this.config.type);
      return isTextField
        ? `请填写${this.config.label}`
        : `请选择${this.config.label}`;
    },
  },
  watch: {
    formValue: function (newValue) {
      if (this.config.type == "rich") {
        this.richData = newValue[this.config.prop];
      }
    },
    richData: function (newValue) {
      if (this.config.extra) {
        this.$nextTick(() => {
          const fieldValue = {
            [this.config.prop]: newValue,
            [this.config.extra]: newValue
              .replace(new RegExp("<.+?>", "g"), "")
              .replace(/[ ]|[&nbsp;]/g, "")
              .trim()
              .substr(0, 100),
          };
          this.$emit("change", fieldValue);
        });
      } else {
        this.$nextTick(() => {
          const fieldValue = {
            [this.config.prop]: newValue,
          };
          this.$emit("change", fieldValue);
        });
      }
    },
  },
  methods: {
    handleChange(value) {
      console.log("datepicker", value);
      if (this.config.prop === "englishName") {
        const fieldValue = {
          [this.config.prop]: typeof value === "string" ? value : value,
        };
        this.$emit("change", fieldValue);
      } else {
        const fieldValue = {
          [this.config.prop]: typeof value === "string" ? value.trim() : value,
        };
        this.$emit("change", fieldValue);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.upload {
  width: 148px;
  height: 148px;
  line-height: 148px;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-align: center;

  &_image {
    width: 100%;
    height: 100%;
  }

  &_tip {
    color: #999999;
  }
}

::v-deep .pic-wall {
  .el-upload-list--picture-card .el-upload-list__item {
    width: 318px !important;
    height: 188px !important;
  }
}

.link-container {
  display: flex;
  align-items: center;
}

.link-item {
  width: 318px;
  margin-right: 8px;
}
</style>

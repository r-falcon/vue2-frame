<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <FormItem :config="config" :formValue="form" @change="handleChange" />
      <FormItem :config="config1" :formValue="form" @change="handleChange" />
      <FormItem :config="config2" :formValue="form" @change="handleChange" />
      <FormItem :config="config3" :formValue="form" @change="handleChange" />
      <FormItem :config="config4" :formValue="form" @change="handleChange" />
      <FormItem :config="config5" :formValue="form" @change="handleChange" />
      <FormItem :config="config6" :formValue="form" @change="handleChange" />
      <FormItem :config="config7" :formValue="form" @change="handleChange" />
      <!-- tip position -->
      <FormItem :config="config8" :formValue="form" @change="handleChange" />
      <!-- tip position -->
      <FormItem :config="config9" :formValue="form" @change="handleChange" />
      <FormItem :config="config10" :formValue="form" @change="handleChange" />
      <FormItem :config="config11" :formValue="form" @change="handleChange" />
      <FormItem :config="config12" :formValue="form" @change="handleChange" />
      <FormItem :config="config13" :formValue="form" @change="handleChange" />
      <FormItem :config="config14">
        <template slot="extra">
          <div>这是form表单组件中封装的插槽部分内容</div>
        </template>
      </FormItem>
    </el-form>
    {{ form }}
  </div>
</template>

<script>
import { FormItem } from "@/components/self/FormItem";

export default {
  name: "useFormItem",
  components: { FormItem },
  data() {
    return {
      form: {
        textValue: "",
        numberValue: 0,
        rowsValue: "",
        selectValue: "",
        radioValue: "",
        checkboxValue: [],
        dateValue: "",
        daterangeValue: [],
        imageValue: "",
        imageCardValue: "",
        fileValue: "",
        richValue: "",
        switchValue: false,
        cascaderValue: [],
        extraValue: "",
      },
      config: {
        type: "text",
        label: "文字输入",
        prop: "textValue",
      },
      config1: {
        type: "number",
        label: "数值输入",
        prop: "numberValue",
        min: 0,
        max: 99,
      },
      config2: {
        type: "textarea",
        label: "多行文本",
        prop: "rowsValue",
      },
      config3: {
        type: "select",
        label: "下拉选框",
        prop: "selectValue",
        options: [
          {
            value: "北京",
            label: "北京",
          },
          {
            value: "上海",
            label: "上海",
          },
          {
            value: "深圳",
            label: "深圳",
          },
        ],
      },
      config4: {
        type: "radio",
        label: "单选按钮",
        prop: "radioValue",
        options: [
          {
            value: "北京",
            label: "北京",
          },
          {
            value: "上海",
            label: "上海",
          },
          {
            value: "深圳",
            label: "深圳",
          },
        ],
      },
      config5: {
        type: "checkbox",
        label: "多选值框",
        prop: "checkboxValue",
        options: [
          {
            value: "北京",
            label: "北京",
          },
          {
            value: "上海",
            label: "上海",
          },
          {
            value: "深圳",
            label: "深圳",
          },
        ],
      },
      config6: {
        type: "datepicker",
        label: "单个日期",
        prop: "dateValue",
        pickerType: "date",
        valueFormat: "yyyy-MM-dd",
      },
      config7: {
        type: "daterange",
        label: "日期范围",
        prop: "daterangeValue",
        valueFormat: "yyyy-MM-dd",
        onInput: this.handleOnInput,
      },
      config8: {
        type: "upload",
        label: "单个图片",
        uploadType: "image",
        prop: "imageValue",
        uploadUrl: "",
        listType: "picture", //可选text（默认）、picture、picture-card
        draggable: false,
        uploadHeaders: {},
        showFileList: false,
        fileList: [],
        onSuccess: function () {},
        beforeUpload: function () {},
        onPreview: function () {},
        onRemove: function () {},
        data: {},
        disabled: false,
        fileUrl: "",
        width: "100px",
        height: "100px",
        // 图片上传tip显示不出来
        tip: "上传文件",
      },
      config9: {
        type: "upload",
        label: "图片集合",
        uploadType: "image",
        listType: "picture-card",
        prop: "imageCardValue",
        uploadUrl: "",
        draggable: false,
        uploadHeaders: {},
        showFileList: false,
        fileList: [],
        onSuccess: function () {},
        beforeUpload: function () {},
        onPreview: function () {},
        onRemove: function () {},
      },
      config10: {
        type: "upload",
        label: "上传文件",
        uploadType: "file",
        prop: "fileValue",
        uploadUrl: "",
        draggable: false,
        uploadHeaders: {},
        showFileList: false,
        multiple: false,
        limit: 1,
        fileList: [],
        onSuccess: function () {},
        beforeUpload: function () {},
        onPreview: function () {},
        onRemove: function () {},
        disabled: false,
        tip: "上传文件",
      },
      config11: {
        type: "rich",
        label: "富文本值",
        prop: "richValue",
        height: 300,
      },
      config12: {
        type: "switch",
        label: "控制开关",
        prop: "switchValue",
        disabled: false,
      },
      config13: {
        type: "cascader",
        label: "级联选择",
        prop: "cascaderValue",
        disabled: false,
        options: [
          {
            value: "zhinan",
            label: "指南",
            children: [
              {
                value: "shejiyuanze",
                label: "设计原则",
                children: [
                  {
                    value: "yizhi",
                    label: "一致",
                  },
                  {
                    value: "fankui",
                    label: "反馈",
                  },
                  {
                    value: "xiaolv",
                    label: "效率",
                  },
                  {
                    value: "kekong",
                    label: "可控",
                  },
                ],
              },
              {
                value: "daohang",
                label: "导航",
                children: [
                  {
                    value: "cexiangdaohang",
                    label: "侧向导航",
                  },
                  {
                    value: "dingbudaohang",
                    label: "顶部导航",
                  },
                ],
              },
            ],
          },
          {
            value: "zujian",
            label: "组件",
            children: [
              {
                value: "basic",
                label: "Basic",
                children: [
                  {
                    value: "layout",
                    label: "Layout 布局",
                  },
                  {
                    value: "color",
                    label: "Color 色彩",
                  },
                  {
                    value: "typography",
                    label: "Typography 字体",
                  },
                  {
                    value: "icon",
                    label: "Icon 图标",
                  },
                  {
                    value: "button",
                    label: "Button 按钮",
                  },
                ],
              },
              {
                value: "form",
                label: "Form",
                children: [
                  {
                    value: "radio",
                    label: "Radio 单选框",
                  },
                  {
                    value: "checkbox",
                    label: "Checkbox 多选框",
                  },
                  {
                    value: "input",
                    label: "Input 输入框",
                  },
                  {
                    value: "input-number",
                    label: "InputNumber 计数器",
                  },
                  {
                    value: "select",
                    label: "Select 选择器",
                  },
                  {
                    value: "cascader",
                    label: "Cascader 级联选择器",
                  },
                  {
                    value: "switch",
                    label: "Switch 开关",
                  },
                  {
                    value: "slider",
                    label: "Slider 滑块",
                  },
                  {
                    value: "time-picker",
                    label: "TimePicker 时间选择器",
                  },
                  {
                    value: "date-picker",
                    label: "DatePicker 日期选择器",
                  },
                  {
                    value: "datetime-picker",
                    label: "DateTimePicker 日期时间选择器",
                  },
                  {
                    value: "upload",
                    label: "Upload 上传",
                  },
                  {
                    value: "rate",
                    label: "Rate 评分",
                  },
                  {
                    value: "form",
                    label: "Form 表单",
                  },
                ],
              },
              {
                value: "data",
                label: "Data",
                children: [
                  {
                    value: "table",
                    label: "Table 表格",
                  },
                  {
                    value: "tag",
                    label: "Tag 标签",
                  },
                  {
                    value: "progress",
                    label: "Progress 进度条",
                  },
                  {
                    value: "tree",
                    label: "Tree 树形控件",
                  },
                  {
                    value: "pagination",
                    label: "Pagination 分页",
                  },
                  {
                    value: "badge",
                    label: "Badge 标记",
                  },
                ],
              },
              {
                value: "notice",
                label: "Notice",
                children: [
                  {
                    value: "alert",
                    label: "Alert 警告",
                  },
                  {
                    value: "loading",
                    label: "Loading 加载",
                  },
                  {
                    value: "message",
                    label: "Message 消息提示",
                  },
                  {
                    value: "message-box",
                    label: "MessageBox 弹框",
                  },
                  {
                    value: "notification",
                    label: "Notification 通知",
                  },
                ],
              },
              {
                value: "navigation",
                label: "Navigation",
                children: [
                  {
                    value: "menu",
                    label: "NavMenu 导航菜单",
                  },
                  {
                    value: "tabs",
                    label: "Tabs 标签页",
                  },
                  {
                    value: "breadcrumb",
                    label: "Breadcrumb 面包屑",
                  },
                  {
                    value: "dropdown",
                    label: "Dropdown 下拉菜单",
                  },
                  {
                    value: "steps",
                    label: "Steps 步骤条",
                  },
                ],
              },
              {
                value: "others",
                label: "Others",
                children: [
                  {
                    value: "dialog",
                    label: "Dialog 对话框",
                  },
                  {
                    value: "tooltip",
                    label: "Tooltip 文字提示",
                  },
                  {
                    value: "popover",
                    label: "Popover 弹出框",
                  },
                  {
                    value: "card",
                    label: "Card 卡片",
                  },
                  {
                    value: "carousel",
                    label: "Carousel 走马灯",
                  },
                  {
                    value: "collapse",
                    label: "Collapse 折叠面板",
                  },
                ],
              },
            ],
          },
          {
            value: "ziyuan",
            label: "资源",
            children: [
              {
                value: "axure",
                label: "Axure Components",
              },
              {
                value: "sketch",
                label: "Sketch Templates",
              },
              {
                value: "jiaohu",
                label: "组件交互文档",
              },
            ],
          },
        ],
      },
      config14: {
        hidden: false,
        prop: "extraValue",
        label: "其他内容",
      },
    };
  },
  methods: {
    handleChange(value) {
      this.form = { ...this.form, ...value };
    },
    handleOnInput(value) {
      this.form.daterangeValue = value;
    },
  },
};
</script>

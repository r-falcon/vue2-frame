<template>
  <div class="app-container">
    <div style="color: red">
      文件上传预览下载、图片上传预览、excel导入导出、html转pdf导出、打印、图片水印
    </div>
    <p>文件上传组件：</p>
    <FileUpload
      ref="fileUpload"
      @file-success="handleFileUploadSuccess"
      @file-remove="handleFileRemove"
    ></FileUpload>

    <p>图片上传组件：</p>
    <ImageUpload
      :value="photoList"
      @image-success="handleImageUploadSuccess"
      @image-remove="handleImageRemove"
    ></ImageUpload>

    <p>图片裁剪：vue-cropper组件，个人中心，用户头像修改需要</p>

    <p>导出pdf：</p>
    <!-- npm install --save html2canvas jspdf -->
    <el-button type="primary" @click="handleDownloadPDF">导出PDF</el-button>
    <el-button @click="handlePrint">打印</el-button>
    <!-- <div id="content" style="margin-top:20px">
      <el-row>
        <el-col :span="8"> 姓 名：falcon </el-col>

        <el-col :span="8"> 年 龄：21 </el-col>

        <el-col :span="8"> 爱 好：shopping </el-col>

        <el-col :span="8"> 年 龄：21 </el-col>

        <el-col :span="8"> 爱 好：shopping </el-col>
      </el-row>
    </div> -->

    <div id="content" style="margin: 20px">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </div>

    <p>水印区域</p>
    <div
      class="mark_box"
      v-watermark="{ text: '这是水印', textColor: 'rgba(180, 180, 180, 0.3)' }"
    ></div>

    <el-button
      type="info"
      icon="el-icon-upload2"
      size="mini"
      @click="handleImport"
      >导入</el-button
    >

    <el-button
      type="warning"
      icon="el-icon-download"
      size="mini"
      @click="handleExport"
      >导出</el-button
    >

    <el-dialog
      :title="upload.title"
      :visible.sync="upload.open"
      width="400px"
      append-to-body
    >
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div slot="tip" class="el-upload__tip">
          <el-checkbox
            v-model="upload.updateSupport"
          />是否更新已经存在的用户数据
          <el-link type="info" style="font-size: 12px" @click="importTemplate"
            >下载模板</el-link
          >
        </div>
        <div slot="tip" class="el-upload__tip" style="color: red">
          提示：仅允许导入“xls”或“xlsx”格式文件！
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { downloadPDF } from "@/utils/htmlToPdf";
import printJS from "print-js";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      photoList: [],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],

      // 导入参数
      upload: {
        // 是否显示弹出层
        open: false,
        // 弹出层标题
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/system/user/importData",
      },

      queryParams: {},
    };
  },
  methods: {
    // file
    handleFileUploadSuccess(file) {
      console.log("success", file);
    },
    handleFileRemove(file) {
      console.log("remove", file);
    },

    // image
    handleImageUploadSuccess(file) {
      console.log("success", file);
    },
    handleImageRemove(file) {
      console.log("remove", file);
    },

    // pdf
    handleDownloadPDF() {
      downloadPDF(document.querySelector("#content"), "文件");
    },

    // print
    handlePrint() {
      printJS({
        printable: "content",
        type: "html",
        maxWidth: "100%",
        targetStyles: ["*"],
        style:
          "@page { size: A4; margin:24.5mm;margin-bottom: 0mm;margin-top: 0mm;}",
      });
    },

    // import
    handleImport() {
      this.upload.title = "用户导入";
      this.upload.open = true;
    },

    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },

    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(response.msg, "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },

     // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },

    gitList() {
      console.log("刷新列表");
    },

    // 下载模板
    importTemplate() {
      this.download(
        "download_template_url",
        {
          ...this.queryParams,
        },
        `user_${new Date().getTime()}.xlsx`
      );
    },

    // export
    handleExport() {
      this.download(
        "export_excel_url",
        {
          ...this.queryParams,
        },
        `exportName.xlsx`
      );
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.mark_box {
  margin: 10px;
  position: relative;
  width: 300px;
  height: 115px;
  border: 1px solid #ccc;
}
</style>

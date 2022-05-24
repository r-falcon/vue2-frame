<template>
  <div class="app-container">
    <div style="color:red;">文件上传预览下载、图片上传预览、excel导入导出、html转pdf导出、打印、图片水印</div>
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

    <div id="content" style="margin-top:20px;">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </div>

    <p>水印区域</p>
    <div class="mark_box" v-watermark="{text: '这是水印', textColor: 'rgba(180, 180, 180, 0.3)'}">
    </div>
  </div>
</template>

<script>
import { downloadPDF } from '@/utils/htmlToPdf';
import printJS from "print-js";

export default {
  data () {
    return {
      photoList: [],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    // file
    handleFileUploadSuccess (file) {
      console.log('success', file);
    },
    handleFileRemove (file) {
      console.log('remove', file);
    },

    // image
    handleImageUploadSuccess (file) {
      console.log('success', file);
    },
    handleImageRemove (file) {
      console.log('remove', file);
    },

    // pdf
    handleDownloadPDF () {
      downloadPDF(document.querySelector('#content'), '文件')
    },

    // print
    handlePrint(){
        printJS({
        printable: "content",
        type: "html",
        maxWidth: "100%",
        targetStyles: ["*"],
        style: "@page { size: A4; margin:24.5mm;margin-bottom: 0mm;margin-top: 0mm;}"
      });
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.mark_box{
  position: relative;
  width: 300px;
  height: 400px;
  border: 1px solid #ccc;
}
</style>
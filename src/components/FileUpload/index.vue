<template>
  <div class="upload-file">
    <el-upload
      :action="uploadFileUrl"
      :before-upload="handleBeforeUpload"
      :file-list="fileList"
      :limit="limit"
      :on-error="handleUploadError"
      :on-exceed="handleExceed"
      :on-preview="handlePreview"
      :on-success="handleUploadSuccess"
      :on-progress="handleProgress"
      :on-remove="handleDelete"
      :show-file-list="true"
      :headers="headers"
      class="upload-file-uploader"
      ref="upload"
    >
      <!-- 上传按钮 -->
      <el-button size="mini" type="primary">选取文件</el-button>
      <!-- 上传提示 -->
      <div class="el-upload__tip" slot="tip" v-if="showTip">
        请上传
        <template v-if="fileSize">
          大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
        </template>
        <template v-if="fileType">
          格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b>
        </template>
        的文件
      </div>
    </el-upload>

    <!-- 文件列表 -->
    <!-- 首先key不能设置为index，不能让key的值随位置的变动影响而影响；然后key不能为null或者undefined，否则会报错。  这里key:file.uid唯一，每次上传会显示两个相同的元素 不带key，上传删除正常 -->
    <!-- <transition-group
      class="upload-file-list el-upload-list el-upload-list--text"
      name="el-fade-in-linear"
      tag="ul"
    >
      <li
        class="el-upload-list__item ele-upload-list__item-content"
        v-for="(file, index) in fileList"
        :key="file.uid"
      >
        <el-link :href="`${file.url}`" :underline="false" target="_blank">
          <span class="el-icon-document"> {{ file.name }} </span>
        </el-link>
        <div class="ele-upload-list__item-content-action">
          <el-link :underline="false" @click="handleDelete(index)" type="danger"
            >删除</el-link
          >
        </div>
      </li>
    </transition-group> -->
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";

export default {
  name: "FileUpload",
  props: {
    // 值
    value: [String, Object, Array],
    // 数量限制
    limit: {
      type: Number,
      default: 5,
    },
    // 大小限制(MB)
    fileSize: {
      type: Number,
      default: 5,
    },
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    fileType: {
      type: Array,
      default: () => ["doc", "xls", "ppt", "txt", "pdf"],
    },
    // 是否显示提示
    isShowTip: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_API,
      uploadFileUrl: process.env.VUE_APP_BASE_API + "private/v1/upload", // 上传的图片服务器地址
      headers: {
        Authorization: getToken(),
      },
      fileList: [],
    };
  },
  // 文件fileList转数组相关
  // watch: {
  //   value: {
  //     handler (val) {
  //       if (val) {
  //         let temp = 1;
  //         // 首先将值转为数组
  //         const list = Array.isArray(val) ? val : this.value.split(',');
  //         // 然后将数组转为对象数组
  //         this.fileList = list.map(item => {
  //           if (typeof item === "string") {
  //             item = { name: item, url: item };
  //           }
  //           item.uid = item.uid || new Date().getTime() + temp++;
  //           return item;
  //         });
  //       } else {
  //         this.fileList = [];
  //         return [];
  //       }
  //     },
  //     deep: true,
  //     immediate: true
  //   }
  // },
  computed: {
    // 是否显示提示
    showTip () {
      return this.isShowTip && (this.fileType || this.fileSize);
    },
  },
  methods: {
    // 上传前校检格式和大小
    handleBeforeUpload (file) {
      // 校检文件类型
      if (this.fileType) {
        let fileExtension = "";
        if (file.name.lastIndexOf(".") > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
        }
        const isTypeOk = this.fileType.some((type) => {
          if (file.type.indexOf(type) > -1) return true;
          if (fileExtension && fileExtension.indexOf(type) > -1) return true;
          return false;
        });
        if (!isTypeOk) {
          this.$message.error(`文件格式不正确, 请上传${this.fileType.join("/")}格式文件!`);
          return false;
        }
      }
      // 校检文件大小
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize;
        if (!isLt) {
          this.$message.error(`上传文件大小不能超过 ${this.fileSize} MB!`);
          return false;
        }
      }
      return true;
    },
    // 文件个数超出
    handleExceed () {
      this.$message.error(`上传文件数量不能超过 ${this.limit} 个!`);
    },
    // 文件预览
    handlePreview (file) {
      if (file.url === '') {
        this.$alert('没有可预览的文件', '提示', {
          confirmButtonText: '知道了'
        })
        return
      }
      window.open(file.url)
      /**
       * 对于文件上传之后，如果能返回预览的url，则点击文件之后可以直接预览
       * 若上传之后，由于后台原因，点击不能预览，并且在点击文件的时候需要带参数请求接口，让他下载，同样使用window.open,格式如下：
       */
      // window.open(
      //   `${process.env.BASE_API}/file/file_download.do?fileRemoteName=${query.fileRemoteName
      //   }&paperCode=${query.paperCode}`
      // );
    },
    // 文件上传进度条
    handleProgress () {
      this.$message.info("上传中,请稍等")
    },
    // 上传失败
    handleUploadError (err) {
      this.$message.error("上传失败, 请重试");
    },
    // 上传成功回调
    handleUploadSuccess (res, file) {
      this.$message.success("上传成功");
      this.fileList.push({ name: file.name, url: res.data.url });
      // this.$emit("input", this.listToString(this.fileList));
      this.$emit("file-success", this.fileList);
    },
    // 删除文件
    handleDelete (file) {
      const list = this.removeFile(this.fileList, file.url);
      this.fileList = list || [];
      this.$emit("file-remove", this.fileList);
    },
    removeFile (list, url) {
      return list.filter(
        item => item.url !== url
      )
    },
    // 获取文件名称
    // getFileName(name) {
    //   if (name.lastIndexOf("/") > -1) {
    //     return name.slice(name.lastIndexOf("/") + 1).toLowerCase();
    //   } else {
    //     return "";
    //   }
    // },
    // 对象转成指定字符串分隔
    // listToString (list, separator) {
    //   let strs = "";
    //   separator = separator || ",";
    //   for (let i in list) {
    //     strs += list[i].url + separator;
    //   }
    //   return strs != '' ? strs.substr(0, strs.length - 1) : '';
    // }
  }
};
</script>

<style scoped lang="scss">
.upload-file-uploader {
  margin-bottom: 5px;
}
.upload-file-list .el-upload-list__item {
  border: 1px solid #e4e7ed;
  line-height: 2;
  margin-bottom: 10px;
  position: relative;
}
.upload-file-list .ele-upload-list__item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: inherit;
}
.ele-upload-list__item-content-action .el-link {
  margin-right: 10px;
}
</style>
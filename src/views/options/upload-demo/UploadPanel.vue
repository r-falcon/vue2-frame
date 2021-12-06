<template>
  <div class="app-container">
    <p>文件上传组件：</p>
    <FileUpload
      ref="fileUpload"
      @file-success="handleUploadSuccess"
      @file-remove="handleRemove"
    ></FileUpload>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    handleUploadSuccess (file) {
      console.log('success', file);
    },
    handleRemove (file) {
      console.log('remove', file);
    }
  }
}
</script>
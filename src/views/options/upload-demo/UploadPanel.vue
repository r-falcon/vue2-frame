<template>
  <div class="app-container">
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      photoList:[]
    }
  },
  methods: {
    handleFileUploadSuccess (file) {
      console.log('success', file);
    },
    handleFileRemove (file) {
      console.log('remove', file);
    },
    handleImageUploadSuccess (file) {
      console.log('success', file);
    },
    handleImageRemove (file) {
      console.log('remove', file);
    }
  }
}
</script>
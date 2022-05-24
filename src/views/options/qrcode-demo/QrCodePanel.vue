<template>
  <div class="app-container">
    <!-- qrcode -->
    <div ref="qrcodeDom"></div>
    <el-button @click="show">展示二维码</el-button>
    <el-button @click="clear">清除二维码</el-button>

    <!-- 
      vue-qr
       text 扫描二维码后跳转的页面
       size 二维码大小
       margin 二维码图像的外边距
       bgSrc 嵌入的背景图地址
       logoSrc 嵌入至二维码中心的logo地址
       logoScale 中间图的尺寸
       dotScale 二维码的点的大小
       colorDark 实点的颜色（注意：和colorLight一起设置才有效）
       colorLight 空白的颜色（注意：和colorDark一起设置才有效）
       autoColor 若为 true, 背景图的主要颜色将作为实点的颜色, 即 colorDark,默认 true
    -->
    <vue-qr 
      v-show="isShow"
      :text="imgUrl"
      :size="250"
      :logoSrc="logo"
      :logoScale="0.2"
    />

    <p>以下插入了组件：</p>
    <code-login />
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import VueQr from 'vue-qr'
import CodeLogin from './codeLogin'

export default {
  components:{
    VueQr,
    CodeLogin
  },
  data() {
    return {
      isShow:false,
      imgUrl:'https://cn.bing.com/',
      logo:require('../../../assets/logo/logo.png')
    }
  },
  methods: {
    // 生成二维码
    MakeQrcode() {
      new QRCode(this.$refs.qrcodeDom, {
        text: "https://cn.bing.com/", // 扫码后页面地址
        width: 128, // 二维码宽度
        height: 128, // 二维码高度
        colorDark: "#000000", // 二维码颜色
        colorLight: "#ffffff", // 背景颜色
        correctLevel: QRCode.CorrectLevel.H, // 校正水准
      });
    },
    // 清除二维码
    clear() {
      this.isShow = false
      this.$refs.qrcodeDom.innerHTML = "";
    },
    // 展示二维码
    show() {
      this.$nextTick(() => {
        this.isShow = true
        this.MakeQrcode();
      });
    },
  },
};
</script>

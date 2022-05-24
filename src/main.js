import Vue from "vue";

import Cookies from "js-cookie";

import Element from "element-ui";
import "./assets/styles/element-variables.scss";

import "@/assets/styles/index.scss"; // global css
import "@/assets/styles/ruoyi.scss"; // ruoyi css
import App from "./App";
import store from "./store";
import router from "./router";
import directive from "./directive"; //directive
import plugins from "./plugins"; // plugins
import Print from "vue-print-nb";

import "./assets/icons"; // icon
import "./permission"; // permission control

import {
  parseTime,
  resetForm,
  downloadLook,
  deleteChildren,
} from "@/utils/ruoyi";
import { download } from "@/utils/request";

// 分页组件
import Pagination from "@/components/Pagination";
// 文件上传组件
import FileUpload from "@/components/FileUpload";
// 图片上传组件
import ImageUpload from "@/components/ImageUpload";
// 富文本组件
import Editor from "@/components/Editor";

// import { getDicts } from "@/api/system/dict/data";
// import { getConfigKey } from "@/api/system/config";
// 自定义表格工具组件
// import RightToolbar from "@/components/RightToolbar";
// 富文本组件
// import Editor from "@/components/Editor";
// 字典标签组件
// import DictTag from "@/components/DictTag";
// 头部标签组件
// import VueMeta from "vue-meta";
// 字典数据组件
// import DictData from "@/components/DictData";

// 全局方法挂载
// Vue.prototype.getDicts = getDicts;
// Vue.prototype.getConfigKey = getConfigKey;
// 时间日期格式化
Vue.prototype.parseTime = parseTime;
// 表单重置
Vue.prototype.resetForm = resetForm;
// 通用下载、预览方法
Vue.prototype.downloadLook = downloadLook;
// 通用下载方法（需要创建虚拟链接）
Vue.prototype.download = download;
// 递归删除树形结构中children为空的节点
Vue.prototype.deleteChildren = deleteChildren;

// 全局组件挂载
// Vue.component("DictTag", DictTag);
// Vue.component("RightToolbar", RightToolbar);
// Vue.component("Editor", Editor);
Vue.component("Pagination", Pagination);
Vue.component("FileUpload", FileUpload);
Vue.component("ImageUpload", ImageUpload);
Vue.component("Editor", Editor);

Vue.use(Print);
Vue.use(directive);
Vue.use(plugins);
// Vue.use(VueMeta);
// DictData.install();

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element, {
  size: Cookies.get("size") || "medium", // set element-ui default size
});

Vue.config.productionTip = false;

// vue全局注册指令
Vue.directive('watermark', (el, binding)=>{
  function addWaterMarker(str, parentNode, font, textColor){// 水印文字，父元素，字体，文字颜色
    let can = document.createElement('canvas');
    parentNode.appendChild(can);
    can.width = 200;
    can.height = 140;
    can.style.display = 'none';
    let cans = can.getContext('2d');
    let img = new Image();
    img.src = require('./assets/logo/logo.png');
    img.onload = () => {
      console.log(img)
      cans.drawImage(img, 10, 0, 115, 70);
      cans.rotate(-27 * Math.PI / 180);
      cans.font = font || "10px Microsoft Yahei";
      cans.fillStyle = textColor || "#707070";
      cans.textAlign = 'left';
      cans.fillText(str, -10, 108);
      cans.stroke();
      // 设置背景图片
      // parentNode.style.backgroundImage = "url(" + can.toDataURL("image/png") + ")";
    
    // 定位	
      let div = document.createElement('div');
      div.id = str;
      div.style.pointerEvents = 'none';
      div.style.top = '0';
      div.style.left = '0';
      div.style.position = 'absolute';
      // div.style.zIndex = '100000';
      div.style.width = '100%';
      div.style.height = '100%';
      div.style.background = 'url(' + can.toDataURL('image/png') + ') no-repeat';
      parentNode.appendChild(div);
    }
  }
  addWaterMarker(binding.value.text, el, binding.value.font, binding.value.textColor)
})

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});

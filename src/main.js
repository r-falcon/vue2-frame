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
// 水印
import "./utils/waterMarker";
// 引入amap
import VueAMap from "vue-amap";

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
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: "06de186c9792fd737ab1f98aa05b8848",
  plugin: [
    "AMap.Scale", // 地图比例尺插件
    "AMap.OverView", // 地图鹰眼插件，默认在地图右下角显示缩略图
    "AMap.ToolBar", // 地图工具条插件，可以用来控制地图的缩放和平移
    "AMap.MapType", // 地图类型切换插件，用来切换固定的几个常用图层
    "AMap.PlaceSearch", // 输入提示插件
    "AMap.Geolocation", // 定位插件，整合了浏览器定位、精确IP定位、sdk辅助定位多种手段
    "AMap.Geocoder", // 地址编码服务(地理编码和逆地理编码)
  ],
  v: "1.4.4", //  高德SDK的版本
  uiVersion: "1.0", //  UI库的版本
});

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

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});

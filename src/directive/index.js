import hasRole from "./permission/hasRole";
import hasPermi from "./permission/hasPermi";
import dialogDrag from "./dialog/drag";
import dialogDragWidth from "./dialog/dragWidth";
import dialogDragHeight from "./dialog/dragHeight";
import copy from "./copy";
import longpress from "./longpress";
import debounce from "./debounce";
import throttle from "./throttle";
import imglazy from "./imglazy";
import watermarker from "./watermarker";

const install = function (Vue) {
  Vue.directive("hasRole", hasRole);
  Vue.directive("hasPermi", hasPermi);
  Vue.directive("dialogDrag", dialogDrag);
  Vue.directive("dialogDragWidth", dialogDragWidth);
  Vue.directive("dialogDragHeight", dialogDragHeight);
  Vue.directive("copy", copy);
  Vue.directive("longpress", longpress);
  Vue.directive("debounce", debounce);
  Vue.directive("throttle", throttle);
  Vue.directive("imglazy", imglazy);
  Vue.directive("watermark", watermarker);
};

if (window.Vue) {
  window["hasRole"] = hasRole;
  window["hasPermi"] = hasPermi;
  Vue.use(install); // eslint-disable-line
}

export default install;

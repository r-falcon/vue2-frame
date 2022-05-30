export function loadAMap() {
  return new Promise((resolve, reject) => {
    if (window.AMap) resolve();
    window.init = function () {
      resolve();
    };
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "//webapi.amap.com/maps?v=1.4.15&key=申请的key&plugin=用到的服务&callback=init";
  });
}

// 水印
const watermark = {
  inserted: (el, binding) => {
    function addWaterMarker(str, parentNode, font, textColor) {
      var can = document.createElement("canvas");
      parentNode.appendChild(can);
      can.width = 400;
      can.height = 200;
      can.style.display = "none";
      var cans = can.getContext("2d");
      cans.rotate((-20 * Math.PI) / 180);
      cans.font = font || "16px Microsoft JhengHei";
      cans.fillStyle = textColor || "rgba(180, 180, 180, 0.3)";
      cans.textAlign = "center";
      cans.textBaseline = "Middle";
      cans.fillText(str, can.width / 3, can.height / 2);
      parentNode.style.backgroundImage =
        "url(" + can.toDataURL("image/png") + ")";
    }
    addWaterMarker(
      binding.value.text,
      el,
      binding.value.font,
      binding.value.textColor
    );
  },
};
export default watermark;

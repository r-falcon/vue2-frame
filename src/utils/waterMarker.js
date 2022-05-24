import Vue from 'vue'

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
    // img.src = require('./assets/logo/logo.png');
    img.src = require('../assets/logo/logo.png');
    img.onload = () => {
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
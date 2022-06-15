<template>
  <div class="app-container">
    <!-- class与style的动态绑定 -->
    <!-- 绑定class，对象语法 -->
    <div :class="{red:isRed,greenbg:isGreenBg}">test text</div>
    <div :class='classObj'>test another</div>
    <div :class='computedObj'>test computed</div>
    <!-- 绑定class，数组语法 -->
    <div :class='[isBlue,isGreenBg]'>test array class</div>
    <div :class='[isRed?"red":"",isGreenBg]'>test array class with judge</div>
    <div :class='[{green:isGreen},isBlueBg]'>test array class with obj judge</div>
        <!-- 用在组件上，该class将会被添加到组件的根元素上 -->
    <!-- 绑定内联样式，对象语法 -->
    <div :style="{color:activeColor,fontSize:fontSize+ 'px'}">test for inline class</div>
    <div :style='styleObj'>test for inline class for object</div>
    <!-- 绑定内联样式，数组语法，多个样式对象绑定到一个元素上 -->
    <div :style='[styleObj,bgObj]'>test for inline class for array</div>
    <!-- 动态绑定style，浏览器会自动添加一些class属性（transform）的前缀 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRed: true,
      isGreen:true,
      isGreenBg: true,
      classObj:{
        red:true,
        bluebg:true
      },
      isBlue:'blue',
      isGreenBg:'greenbg',
      isBlueBg:'bluebg',
      activeColor:'pink',
      fontSize:24,
      styleObj:{
        color:'yellow',
        fontSize:'16px'
      },
      bgObj:{
        background:'pink',
        border:'1px solid #ccc'
      }
    };
  },
  computed:{
    computedObj(){
      return {
        redbg:true,
        blue:this.isRed ? 'green' : 'red'
      }
    }
  }
};
</script>

<style>
.red {
  color:red;
}
.redbg {
  background: red;
}
.green {
  color: green;
}
.greenbg {
  background:green;
}
.blue {
  color:blue;
}
.bluebg {
  background: blue;
}
</style>

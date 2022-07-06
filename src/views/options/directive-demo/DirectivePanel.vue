<template>
  <div class="app-container">
    <h3>常用的自定义指令</h3>
    <h3>复制</h3>
    <button v-copy="text">复制</button>
    <h3>长按</h3>
    <div>{{ count }}</div>
    <button v-longpress="plusTen" @click="plusOne">长按</button>
    <h3>防抖节流</h3>
    <div>{{ debounceValue }} | {{ throttleValue }}</div>
    <button v-debounce:2000="plusDebounce">防抖：规定时间内多次触发，重新计算</button>
    <button v-throttle:1000="plusThrottle">节流：规定时间内多次触发，忽略不计</button>
    <h3>图片懒加载(自定义指令，vue的lazyload)</h3>
    <img :src="cat" alt="" />
    <!-- <div style="width: 200px; height: 200px; overflow: auto">
      <img
        v-for="(item, index) in arrSrc"
        :key="index"
        :src="moren"
        v-imglazy="item"
        alt="x"
      />
    </div> -->
    <!-- <img v-for="item in 1000" v-lazy="moren" alt="lazy" /> -->
    <h3>水印</h3>
    <div
      style="width: 1000px; height: 400px"
      v-watermark="{
        text: '水印文字',
        font: '46px Microsoft JhengHei',
        width: '100%',
        textColor: 'rgba(180, 180, 180, 0.3)',
      }"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "这是需要复制的东西",
      count: 0,
      debounceValue: 0,
      throttleValue: 0,
      cat: require("@/assets/images/profile.jpg"),
      moren: require("@/assets/images/profile.jpg"),
      arrSrc: [
        require("@/assets/images/profile.jpg"),
        require("@/assets/images/profile.jpg"),
        require("@/assets/images/profile.jpg"),
        require("@/assets/images/profile.jpg"),
        require("@/assets/images/profile.jpg"),
        require("@/assets/images/profile.jpg"),
        require("@/assets/images/profile.jpg"),
        require("@/assets/images/profile.jpg"),
        require("@/assets/images/profile.jpg"),
        require("@/assets/images/profile.jpg"),
        require("@/assets/images/profile.jpg"),
        require("@/assets/images/profile.jpg"),
        require("@/assets/images/profile.jpg"),
        require("@/assets/images/profile.jpg"),
        require("@/assets/images/profile.jpg"),
        require("@/assets/images/profile.jpg"),
      ],
    };
  },
  methods: {
    plusOne() {
      this.count++;
    },
    plusTen() {
      this.count += 10;
    },
    plusDebounce() {
      this.debounceValue++;
    },
    plusThrottle() {
      this.throttleValue++;
    },
  },
};
</script>

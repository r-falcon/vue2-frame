<template>
  <div class="app-container">
  <!-- 高德、腾讯、百度 打卡定位 -->
    <p>高德地图完成poi搜索+定位打卡</p>
    <div class="position">
      <el-input
        disabled
        v-model="region"
        placeholder="请定位打卡位置"
      ></el-input>
      <el-button type="primary" icon="el-icon-place" @click="handlePosition"
        >定位</el-button
      >
    </div>
    <iMap
      :visible.sync="isShow"
      :range="range"
      :text="region"
      @address="address"
      @position="positions"
    />

    <p>百度地图</p>
    <div class="position">
      <el-input
        v-model="uM.keyword"
        placeholder="请输入关键词"
      ></el-input>
      <el-input
        v-model="uM.location"
        placeholder="请输入搜索地"
      ></el-input>

      <el-button type="primary" icon="el-icon-place" @click="handleAnotherPosition"
        >定位</el-button
      >
      <el-button @click="handleAnotherReset">重置</el-button>
    </div>
    <uMap :visible.sync="isAnotherShow" :uM="uM" />
  </div>
</template>

<script>
import iMap from "./iMap.vue";
import uMap from "./uMap.vue";

export default {
  name: "AmapPanel",
  components: {
    iMap,
    uMap,
  },
  data() {
    return {
      isShow: false,
      isAnotherShow:false,
      region: "", //当前位置文字
      range: "100", //范围
      // 经纬度
      regionPosition: {
        lng: "",
        lat: "",
      },
      uM:{
        keyword:'',
        location:''
      }
    };
  },
  methods: {
    handlePosition() {
      this.isShow = true;
    },
    address(val) {
      this.region = val;
    },
    positions(val) {
      this.regionPosition.lng = val[0];
      this.regionPosition.lat = val[1];
    },
    handleAnotherPosition(){
      this.isAnotherShow = true
    },
    handleAnotherReset(){
      this.uM = {
        keyword:'',
        location:''
      }
      this.isAnotherShow = false
    }
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.position {
  display: flex;
}
</style>

<template>
  <div class="app-container">
    <div class="position">
      <el-input
        disabled
        v-model="region"
        placeholder="请定位打卡位置"
      ></el-input>
      <el-button type="primary" icon="el-icon-place" @click="handlePosition">定位</el-button>
    </div>

    <iMap :visible.sync="isShow" :range="range" :text="region" @address="address" @position="positions" />
  </div>
</template>

<script>
import iMap from './iMap.vue'

export default {
  name:'AmapPanel',
  components:{
    iMap
  },
  data() {
    return {
      isShow:false,
      region:'', //当前位置文字 
      range: "100", //范围
      // 经纬度 
      regionPosition:{ 
        lng:'',
        lat:''
      }
    }
  },
  methods: {
    handlePosition(){
      this.isShow = true
    },
    address(val){
      this.region = val 
    },
    positions(val){
      this.regionPosition.lng = val[0] 
      this.regionPosition.lat = val[1] 
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss">
.position{
  display: flex;
}
</style>

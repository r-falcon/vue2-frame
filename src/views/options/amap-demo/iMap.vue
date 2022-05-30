<template>
  <el-dialog
    title="添加打卡范围"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="visible"
    :beforeClose="cancel"
  >
    <template>
      <div class="container">
        <div class="search-box">
          <input v-model="searchKey" type="search" id="search" />
          <button @click="searchByHand">搜索</button>
          <div class="tip-box" id="searchTip"></div>
        </div>
        <el-amap
          class="amap-box"
          :amap-manager="amapManager"
          :vid="'amap-vue'"
          :zoom="zoom"
          :plugin="plugin"
          :center="center"
          :events="events"
        >
          <el-amap-circle
            v-for="(circle, index) in circles"
            :key="index"
            :center="circle.center"
            :radius="circle.radius"
            :fill-color="circle.fillColor"
            :fill-opacity="circle.fillOpacity"
            :stroke-weight="circle.strokeWeight"
            :stroke-color="circle.strokeColor"
            :events="circle.events"
          >
          </el-amap-circle>
        </el-amap>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="preservation">确 定</el-button>
        </span>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
let amapManager = new AMapManager();
export default {
  name: "gdAmap",
  props: {
    text: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    range: {
      type: String,
      default: "",
    },
  },
  watch: {
    range(val) {
      this.circles[0].radius = val;
    },
  },
  data() {
    let self = this;
    return {
      active: false,
      address: null,
      searchKey: "",
      amapManager,
      markers: [],
      circles: [
        {
          center: [114.48, 38.03],
          radius: 50,
          fillOpacity: 0.2,
          fillColor: "#2587F6",
          strokeWeight: 1,
          strokeColor: "#2587F6",
          events: {
            click(e) {
              self.markers = [];
              let { lng, lat } = e.lnglat;
              self.lng = lng;
              self.lat = lat;
              self.center = [lng, lat];
              self.circles[0].center = [lng, lat];
              self.markers.push([lng, lat]);
              // 这里通过高德 SDK 完成。
              let geocoder = new AMap.Geocoder({
                radius: self.range,
                extensions: "all",
              });
              geocoder.getAddress([lng, lat], function (status, result) {
                if (status === "complete" && result.info === "OK") {
                  if (result && result.regeocode) {
                    self.address = result.regeocode.formattedAddress;
                    self.searchKey = result.regeocode.formattedAddress;
                    self.$nextTick();
                  }
                }
              });
            },
          },
        },
      ],
      searchOption: {
        city: "全国",
        citylimit: true,
      },
      radius: 100,
      center: [114.48, 38.03],
      zoom: 17,
      lng: 0,
      lat: 0,
      loaded: false,
      events: {
        init() {
          lazyAMapApiLoaderInstance.load().then(() => {
            self.initSearch();
          });
        },
        // 点击获取地址的数据
        click(e) {
          self.markers = [];
          let { lng, lat } = e.lnglat;
          self.lng = lng;
          self.lat = lat;
          self.center = [lng, lat];
          self.circles[0].center = [lng, lat];
          self.markers.push([lng, lat]);
          // 这里通过高德 SDK 完成。
          let geocoder = new AMap.Geocoder({
            radius: self.range,
            extensions: "all",
          });
          geocoder.getAddress([lng, lat], function (status, result) {
            if (status === "complete" && result.info === "OK") {
              if (result && result.regeocode) {
                self.address = result.regeocode.formattedAddress;
                self.searchKey = result.regeocode.formattedAddress;
                self.$nextTick();
              }
            }
          });
        },
      },
      // 一些工具插件
      plugin: [
        {
          pName: "Geocoder",
          events: {
            init(o) {},
          },
        },
        {
          // 默认定位
          pName: "Geolocation",
          events: {
            init(o) {
              // o是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                console.log("current", result);
                if (result && result.position) {
                  // 获取地点名称
                  self.address = result.formattedAddress;
                  self.searchKey = result.formattedAddress;
                  // 设置经度
                  self.lng = result.position.lng;
                  // 设置维度
                  self.lat = result.position.lat;
                  // 设置坐标
                  self.center = [self.lng, self.lat];
                  self.circles[0].center = [self.lng, self.lat];
                  self.markers.push([self.lng, self.lat]);
                  // load
                  self.loaded = true;
                  // 页面渲染好后
                  // self.$nextTick()
                }
              });
            },
          },
        },
        {
          // 工具栏
          pName: "ToolBar",
          events: {
            init(instance) {},
          },
        },
        {
          // 鹰眼--小地图
          pName: "OverView",
          events: {
            init(instance) {},
          },
        },
        {
          // 搜索
          pName: "PlaceSearch",
          events: {
            init(instance) {},
          },
        },
      ],
    };
  },
  methods: {
    // 确认
    preservation() {
      console.log(this.searchKey, this.circles[0].center);
      this.$emit("address", this.searchKey);
      this.$emit("position", this.circles[0].center);
      this.$emit("update:visible", false);
    },
    // 取消
    cancel() {
      this.$emit("update:visible", false);
    },
    initSearch() {
      let vm = this;
      let map = this.amapManager.getMap();
      AMapUI.loadUI(["misc/PoiPicker"], function (PoiPicker) {
        var poiPicker = new PoiPicker({
          input: "search",
          placeSearchOptions: {
            map: map,
            pageSize: 10,
          },
          suggestContainer: "searchTip",
          searchResultsContainer: "searchTip",
        });
        vm.poiPicker = poiPicker;
        // 监听poi选中信息
        poiPicker.on("poiPicked", function (poiResult) {
          let source = poiResult.source;
          let poi = poiResult.item;
          if (source !== "search") {
            poiPicker.searchByKeyword(poi.name);
          } else {
            poiPicker.clearSearchResults();
            vm.markers = [];
            let lng = poi.location.lng;
            let lat = poi.location.lat;
            let address = poi.cityname + poi.adname + poi.name;
            vm.center = [lng, lat];
            vm.markers.push([lng, lat]);
            vm.lng = lng;
            vm.lat = lat;
            vm.address = address;
            vm.searchKey = address;
            vm.circles[0].center = [lng, lat];
          }
        });
      });
    },
    searchByHand() {
      if (this.searchKey !== "") {
        this.poiPicker.searchByKeyword(this.searchKey);
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.el-dialog__wrapper .el-dialog {
  padding: 0;
  height: 680px;
}

.container {
  position: relative;
  width: 100%;
  height: 500px;
}

.search-box {
  width: 100%;
  position: absolute;
  min-height: 30px;
  z-index: 200;

  input {
    float: left;
    width: 80%;
    height: 30px;
    border: 1px solid #30ccc1;
    padding: 0 8px;
    outline: none;
  }

  button {
    float: left;
    width: 20%;
    height: 30px;
    background: #30ccc1;
    border: 1px solid #30ccc1;
    color: #fff;
    outline: none;
  }

  .tip-box {
    width: 100%;
    max-height: 260px;
    overflow-y: auto;
    background-color: #fff;
  }
}

.amap-box {
  border: solid 1px #999;
}

.amap-toolbar{
  top: 40px;
}

#amap-vue{
  margin-top: 30px;
}

.dialog-footer{
  margin-top: 40px;
  float: right;
}
</style>

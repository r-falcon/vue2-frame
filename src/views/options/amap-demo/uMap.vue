<template>
  <div v-if="visible">
    <baidu-map class="map" :center="map.center" :zoom="map.zoom" @ready="handler">
      <!--缩放-->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>

      <!--定位-->
      <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :showAddressBar="true"
        :autoLocation="true"
      ></bm-geolocation>

      <!--点-->
      <bm-marker
        :position="map.center"
        :dragging="map.dragging"
        animation="BMAP_ANIMATION_DROP"
      >
        <!--提示信息-->
        <bm-info-window :show="map.show">Hello~</bm-info-window>
      </bm-marker>

      <!-- 搜索 -->
      <bm-local-search
        :keyword="uM.keyword"
        :auto-viewport="true"
        :location="uM.location"
      ></bm-local-search>
      <!-- 
        
        前端方案：所有路由信息在前端配置，通过路由导航守卫后获取用户角色，过滤得到角色所对应的路由，添加到动态路由上
        后端方案：将所有路由信息存储在数据库，当用户登录后根据其角色返回相应的路由，并添加到动态路由上
       -->
    </baidu-map>
  </div>
</template>

<script>
export default {
  name: "demo",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    uM: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    map: {
      center: { lng: 0, lat: 0 },
      zoom: 15,
      show: true,
      dragging: true,
    },
  }),

  methods: {
    handler({ BMap, map }) {
      let me = this;
      console.log(BMap, map);
      // 鼠标缩放
      map.enableScrollWheelZoom(true);
      // 点击事件获取经纬度
      map.addEventListener("click", function (e) {
        console.log(e.point.lng, e.point.lat);
      });
    },
  },
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 400px;
}
</style>

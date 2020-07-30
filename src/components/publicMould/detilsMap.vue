<template>
  <div class="my-map">
    <div class="map-content">
      <baidu-map :center="center" :zoom="zoom" @ready="handler" :scroll-wheel-zoom="true" class="bm-view">
        <!--<bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>-->
        <bm-info-window :position="center" :show="infoWindow" :closeOnClick="close">
          <p class="my-title"></p>
          <p class="my-address"></p>
          <div class="my-cover"></div>
        </bm-info-window>

      </baidu-map>
    </div>
    <!--<baidu-map class="li_map_box" :center="center" :zoom="zoom" @ready="handler2"></baidu-map>-->
  </div>
</template>

<script>
export default {
    name: "detilsMap",
  data(){
      return{
        center: {lng: 0, lat: 0},
        zoom: 5,
        address:'成都市',
        active:'',
        infoWindow:true,
        close:false,
        index:0,
      }
  },
  methods:{
    handler ({BMap, map}) {
      //地址逆解析
      let _this=this;
      var myGeo = new BMap.Geocoder();
      myGeo.getPoint(_this.address, function(point){
          // console.log(point.lat)
          _this.center.lng = point.lng; //经度
          _this.center.lat = point.lat;//纬度
          _this.zoom = 15;
        },
        "四川省");
    },
  },
}
</script>

<style scoped>
  .my-map{
    width: 100%;
    height: 100%;
  }
  .my-map .map-content{
    width: 100%;
    height: 100%;
  }
  .my-map .bm-view{
    height: 100%;
  }
</style>

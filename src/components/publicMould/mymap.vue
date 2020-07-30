<template>
    <div class="my-map">
      <div class="map-content" v-if="mapHide">
        <baidu-map :center="center" :zoom="zoom" @ready="handler2" :scroll-wheel-zoom="true" class="bm-view">
          <bm-marker :position="{lng: center.lng, lat: center.lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
        </baidu-map>
      </div>
      <!--<baidu-map class="li_map_box" :center="center" :zoom="zoom" @ready="handler2"></baidu-map>-->
    </div>
</template>

<script>
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
export default {
    name: "mymap",
  props:['dizhi'],
  data(){
      return{
        center: {lng: 0, lat: 0},
        zoom: 5,
        mapArr: {
          lat: 0,
          lng: 0,
        },
        detailsText:{
          address:'蓬安县'
        },
        map: null,
        local: null,
        mk: null,
        latitude: '',
        longitude: '',
        keyWords: '',
        mapHide:false,
      }
  },
  watch:{
    dizhi:function(newVal,oldVal){
      console.log(newVal);
      this.detailsText.address=newVal;
      this.mapHide=true
    },
  },
  methods:{
    handler2 ({BMap, map}) {
      //地址逆解析
      let _this=this;
      var myGeo = new BMap.Geocoder();
      myGeo.getPoint(_this.detailsText.address, function(point){
          // console.log(point.lat)
          _this.center.lng = point.lng; //经度
          _this.center.lat = point.lat;//纬度
          _this.zoom = 15;
        },
        "四川省");
    },
    showLocation(e) {//jsonp回调的方法，拿到转换成经纬度的值
      this.mapArr = e.result.location
    },
    getWd(){
      let vm = this;
      vm.$jsonp(
        //调用百度地图，获取地理位置的经纬度
        'http://api.map.baidu.com/geocoding/v3/?address=' + vm.ipAll +
        '&output=json&ak=X7UHQqYy3WobTXHk3Mw3oN96ahHcQuuG&callback=showLocation',
      ).then(res=>{
        vm.showLocation(res)
      }).catch(err=>{})
    },
    handler ({BMap, map}) {
      console.log(BMap, map)
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.zoom = 15;
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
  .li_map_box{
    height: 100%;
  }
</style>

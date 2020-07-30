<template>
    <div class="my-map">
      <div class="determine" @click="recurrence">确定</div>
      <div class="map-content" v-if="mapHide">
        <!--<baidu-map @click="clickMap" :center="center" :zoom="zoom" @ready="handler" :scroll-wheel-zoom="true" class="bm-view">-->
          <!--<bm-marker :position="{lng: center.lng, lat: center.lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>-->
        <!--</baidu-map>-->
        <baidu-map class="li_map_box" :center="center" :zoom="zoom" @ready="handler">
          <bm-marker @dragend="dragend" :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
        </baidu-map>
      </div>
      <div class="entry-box">
          <div class="serch-box">
            <div class="left"><input type="text" v-model="serchVal" placeholder="请输入搜索地址"/></div>
            <div class="right" @click="clickSerch">搜索</div>
          </div>
          <ul class="serch-list">
            <li :class="index==i?'active':''" @click="clickLi(i)" v-for="(item,i) in surroundingPois" :key="i">{{item.address}}</li>
          </ul>
      </div>
    </div>
</template>

<script>
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
export default {
    name: "locationMap",
  data(){
      return{
        center: {lng: 0, lat: 0},
        zoom:13,
        mapHide:true,
        address:'成都市',
        serchVal:'',
        myGeo:{},
        BMap:'',
        map:'',
        initLocation:'',
        surroundingPois:[],
        index:-1,
      }
  },
  methods:{
    handler ({BMap, map}) {
      map.enableScrollWheelZoom(true);
      // map.centerAndZoom('青岛市', 13)
      const _this = this;
      const geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition(function (r) {
           // console.log(r)
           _this.center = { lng: r.longitude, lat: r.latitude }        // 设置center属性值
           _this.initLocation = true;
         }, { enableHighAccuracy: true })
      window.map = map;
     // 赋值，方便调用，本节被用到
     this.BMap = BMap;
     this.map = map;
    },
    clickMap(type){
      console.log(type)
    },
    handler2 ({BMap, map}) {
      this.center.lng = 116.404;
      this.center.lat = 39.915;
    },
    clickSerch(){
      let _this=this;
      this.address=this.serchVal;
      let myGeo = new this.BMap.Geocoder();
      myGeo.getPoint(_this.address, function(point){
          _this.center.lng = point.lng; //经度
          _this.center.lat = point.lat;//纬度
        },
        "四川省");
    },
    dragend(e){
      this.position = e.point;
       const _this = this;
       // console.log(e.point)
       // console.log(this.position)
       const gc = new this.BMap.Geocoder();
      gc.getLocation(e.point, function (rs) {
          console.log(rs);
          console.log(rs.surroundingPois);
          _this.center.lng = rs.point.lng; //经度
          _this.center.lat = rs.point.lat;//纬度
          _this.surroundingPois=rs.surroundingPois;
          _this.addr = rs.address
         })
    },
    recurrence(){
      let _obj={
        lng: this.center.lng,
        lat: this.center.lat,
        address:this.address,
      };
      this.$emit("e-word",_obj)
    },
    clickLi(index){
      this.index=index;
      this.address=this.surroundingPois[index].address;
      this.center.lng=this.surroundingPois[index].point.lng;
      this.center.lat=this.surroundingPois[index].point.lat;
    }


  },
}
</script>

<style scoped>
  .my-map{
    position: fixed;
    left: 0rem;
    top:0rem;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background: #fff;
  }
  .my-map .map-content{
    width: 100%;
    height: 8rem;
  }
  .my-map .bm-view{
    height: 100%;
  }
  .li_map_box{
    height: 100%;
  }
  .my-map .entry-box{
    height: calc(100% - 8rem);
  }
  .serch-box{
    display: flex;
    display: -webkit-flex;
    display: -moz-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    -moz-justify-content: space-between;
    padding: 0.3rem;
  }
  .serch-box .left{
    width: 5rem;
    height: 0.7rem;
    background: #f5f5f5;
    border-radius: 0.3rem;
    padding-left: 0.5rem;
  }
  .serch-box .left input{
    display: block;
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    background: none;
    box-sizing: border-box;
    font-size: 0.3rem;
  }
  .serch-box .right{
    background: #ff7070;
    padding: 0rem 0.3rem;
    font-size: 0.3rem;
    line-height: 0.7rem;
    color: #fff;
    border-radius: 0.1rem;
  }
  .determine{
    position: fixed;
    right: 0.3rem;
    top:0.3rem;
    z-index: 9999;
    background: #ff7070;
    padding: 0rem 0.3rem;
    font-size: 0.3rem;
    line-height: 0.7rem;
    color: #fff;
    border-radius: 0.1rem;
  }
  .serch-list{
    height:calc(100% - 1.3rem);
    box-sizing: border-box;
    padding: 0.3rem;
    overflow: hidden;
    overflow-y: auto;
  }
  .serch-list li{
    font-size: 0.3rem;
    padding: 0.3rem 0rem;
    border-bottom: solid 1px #ccc;
  }
  .serch-list .active{
    background: #f5f5f5;
  }
</style>

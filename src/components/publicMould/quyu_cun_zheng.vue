<template>
    <div class="lianji-box">
      <div class="bg-box"></div>
      <div class="lianji-content">
        <van-picker show-toolbar :columns="columns" @confirm="clickConfirm"  @cancel="clickCancel" @change="getColumnIndex"/>
      </div>
    </div>
</template>

<script>
  import {config} from '../js/httpConfig'
export default {
    name: "quyu_cun_zheng",
  data(){
      return{
        town:[],//镇
        village:[],//村
        province:'',//省id
        city:'',//市id
        area:'',//县id
        columns:[
          // {
          //   text: '浙江',
          //   id:'1',
          //   children: [
          //     {
          //       text: '杭州',
          //       id:'22',
          //       children: [{ text: '西湖区' }, { text: '余杭区' }],
          //     },
          //     {
          //       text: '温州',
          //       id:'33',
          //       children: [{ text: '鹿城区' }, { text: '瓯海区' }],
          //     },
          //   ],
          // },
        ],
      }
  },
  created(){
    this.getFindCityByPName();
    this.getData();
  },
  methods:{
   getData(){
     let _this=this;
     $.ajax({
       url:config.findTreeList,
       data:{orgId:1},
       success:res=>{
         for(let i=0; i<res.data.length; i++){
           if(res.data[i].id==2){
             console.log(res.data[i])
             _this.columns.push({
               id:res.data[i].id,
               pId:res.data[i].pid,
               text:res.data[i].name,
               type:res.data[i].type,
               children:[]
             })
           }
           if(res.data[i].type==4){
             let _obj={
               id:res.data[i].id,
               pId:res.data[i].pid,
               text:res.data[i].name,
               type:res.data[i].type,
               children:[]
             };
             _this.town.push(_obj)
           }else if(res.data[i].type==5){
             let _obj2={
               id:res.data[i].id,
               pId:res.data[i].pid,
               text:res.data[i].name,
               type:res.data[i].type,
             };
             _this.village.push(_obj2)
           }
         }
         _this.columns[0].children= _this.town;
        for(let n=0; n<_this.town.length; n++){
          var _id=_this.town[n].id;
          for(let y=0; y<_this.village.length; y++){
            if(_this.village[y].pId==_id){
              _this.town[n].children.push(_this.village[y])
            }
          }
        }
       }
     })
   },
    clickConfirm(e,val){
        console.log(e);
        console.log(val);
      let _obj={
        locationName:e[0]+'-'+e[1]+'-'+e[2],
        countyId:this.columns[val[0]].id,//县
        town:this.columns[val[0]].children[val[1]].id,//镇
        village:this.columns[val[0]].children[val[1]].children[val[2]].id,//村
        province:this.province,//区域省
        city:this.city,//区域市
        area:this.area,//区域县
      };
      this.$emit('cunzheng',_obj)
    },
    clickCancel(){
      this.$emit('cunzheng',false)
    },
    getColumnIndex(){
      //滚动监测
    },
    getFindCityByPName(){
      let _this=this;
      $.ajax({
        url:config.findAreaNameAndValue,
        async:false,
        success:res=>{
          if(res.status==200){
            _this.province=res.data.province.id;
            _this.city=res.data.city.id;
            _this.area=res.data.area.id;
          }else{_this.$toast(res.message)}
        }
      })
    }
  },
}
</script>

<style scoped>
  .lianji-box{
    background: rgba(0,0,0,.5);
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0rem;
    top:0rem;
  }
  .lianji-box .bg-box{
    position: absolute;
    left: 0rem;
    top:0rem;
    width: 100%;
    height: 100%;
    z-index: 3;
  }
  .lianji-box .lianji-content{
    position: absolute;
    left: 0rem;
    bottom: 0rem;
    width: 100%;
    z-index: 10;
  }
</style>

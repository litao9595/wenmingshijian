<template>
  <div class="lianji-box">
    <div class="bg-box" @click="clickCancel"></div>
    <div class="lianji-content">
      <van-picker show-toolbar :columns="columns" @confirm="clickConfirm"  @cancel="clickCancel" @change="getColumnIndex"/>
    </div>
  </div>
</template>

<script>
  import {config} from '../js/httpConfig'
export default {
    name: "jgSelct",
  data(){
      return{
        city:[],//市
        county:[],//县
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
      this.getData('四川省');
  },
  methods:{
    clickConfirm(e,val){
      let _obj={
        locationName:e[0]+'-'+e[1],
        cityId:this.columns[val[0]].id,//市
        countyId:this.columns[val[0]].children[val[1]].id,//县
      };
      this.$emit('lct',_obj)
    },
    clickCancel(e){
      this.$emit('lct',false)
    },
    //监听变化
    getColumnIndex(picker, values){
      let _index=picker.getIndexes(1)[0]
     // console.log(picker.getIndexes(1))
    },
    getData(name){
      let _this=this;
      $.ajax({
        url:config.findCityByPName,
        data:{pName:name},
        success:res=>{
          if(res.status==200){
            for(let i=0; i<res.data.length; i++){
              if(res.data[i].type==2){
                let _obj={
                  id:res.data[i].id,
                  pId:res.data[i].pId,
                  text:res.data[i].cityName,
                  type:res.data[i].type,
                  children:[]
                };
                _this.columns.push(_obj)
                _this.city.push(res.data[i]);
              }else if(res.data[i].type==3){
                _this.county.push(res.data[i]);
              }
            }
            for(let n=0; n<_this.columns.length; n++){
              var _id=_this.columns[n].id;
              for(let y=0; y<_this.county.length; y++){
                if(_this.county[y].pId==_id){
                  let _obj2={
                    id:_this.county[y].id,
                    pId:_this.county[y].pId,
                    text:_this.county[y].cityName,
                    type:_this.county[y].type,
                  };
                  _this.columns[n].children.push(_obj2)
                }
              }
            }
          }else{
            _this.$toast('获取地址失败')
          }
        }
      })
    },
  },
  mounted(){

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

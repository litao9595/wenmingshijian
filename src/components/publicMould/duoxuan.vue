<template>
    <div class="duoxuan-box">
      <van-popup v-model="show" position="bottom" @click-overlay="cancelBtn">
        <div class="control-box">
          <div class="cancel-btn" @click="cancelBtn">取消</div>
          <div class="complete-btn" @click="complete">完成</div>
        </div>
        <ul class="list-box">
          <li @click="clickOption(i)" :class="item.status?'active':''" v-for="(item,i) in list" :key="i">{{item.itemName}}</li>
        </ul>
      </van-popup>
    </div>
</template>

<script>
export default {
    name: "duoxuan",
  props:['myDuoxuanData'],
  data(){
      return{
        show:true,
        list:[
          // {id:1,itemName:'儿童',status:false},
        ],
        submitVal:[],//选中值
        max:4,//最大多选个数
      }
  },
  created(){
    this.list=this.myDuoxuanData;
    for(let i=0; i<this.myDuoxuanData.length; i++){
      this.myDuoxuanData[i].status?this.submitVal.push(this.myDuoxuanData[i]):''
    }
  },
  methods:{
    cancelBtn(){
      //取消
      this.submitVal=[];
      this.$emit('duoxuanData',[])
    },
    complete(){
      this.$emit('duoxuanData',this.list)
      //完成
    },
    clickOption(i){
      let _obj={
        id:this.list[i].id,
        itemName:this.list[i].itemName
      };
      if(this.list[i].status){
        //删除
        this.list[i].status=false;
        for(let i=0; i<this.submitVal.length; i++){
          if(this.submitVal[i].itemName==_obj.itemName){
            this.submitVal.splice(i,1)
          }
        }
      }else{
        //添加
        if(this.submitVal.length<this.max){
          this.list[i].status=true;
          this.submitVal.push(_obj)
        }else{
          this.toNotify('最多不能超过4个选项')
        }
      }
    },
    toNotify(mse){
      this.$notify({
        message:mse,
        background:'#999',
        duration: 1000
      })
    },
  },
}
</script>

<style scoped>
.duoxuan-box{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0rem;
  top:0rem;
}
.duoxuan-box .control-box{
  display: flex;
  justify-content: space-between;
  font-size: 0.3rem;
  /*background: #f5f5f5;*/
  line-height: 0.8rem;
  padding: 0rem 0.3rem;
}
.duoxuan-box .control-box .cancel-btn{
  color: #1989fa;
}
.duoxuan-box .control-box .complete-btn{
  color: #1989fa;
}
.duoxuan-box .list-box{
  overflow: hidden;
  padding: 0.3rem;
}
.duoxuan-box .list-box li{
  float: left;
  font-size: 0.25rem;
  width: 2rem;
  line-height: 0.6rem;
  border: solid 1px #ccc;
  border-radius: 0.1rem;
  -webkit-border-radius: 0.1rem;
  -moz-border-radius: 0.1rem;
  color: #ccc;
  text-align: center;
  margin-right: 0.35rem;
  margin-bottom: 0.3rem;
}
.duoxuan-box .list-box li:nth-child(3n){
  margin-right: 0rem;
}
.duoxuan-box .list-box .active{
  color: #fff;
  background: #ff7070;
}
</style>

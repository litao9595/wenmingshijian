<template>
    <div>
      <p>{{data}}</p>
      <ul>
        <li v-for="(item,i) in list">{{item}}</li>
      </ul>
    </div>
</template>

<script>
export default {
    name: "ceshi",
  props:['chuanzhi'],
  data(){
      return{
        data:this.chuanzhi,
        list:[1,2,3,4,5],
      }
  },
  watch:{
    chuanzhi(val){
      this.data=val
      console.log("变化了")
    }
  },
  methods:{},
}
</script>

<style scoped>

</style>

<template>
    <div class="seek-help-box" v-title data-title="困难求助">
      <div class="seek-help-main">
          <div class="help-content-box">
            <div class="input-list">
              <div class="left"><i>*</i>主题</div>
              <div class="right"><input v-model="formData.title" type="text" placeholder="请输入主题"/></div>
            </div>
            <div class="input-list" @click="hardTypeStute=true">
              <div class="left"><i>*</i>类型</div>
              <div class="right right-selct"><input v-model="hardTypeTxt" readonly type="text" placeholder="请选择类型"/></div>
            </div>
            <div class="input-list" @click="quyucunzhengSelct=true">
              <div class="left"><i>*</i>所属区域</div>
              <div class="right right-selct"><input v-model="orgIdText" readonly type="text" placeholder="请选择所属区域"/></div>
            </div>
            <div class="input-list" @click="mapStaus=true">
              <div class="left"><i>*</i>详细地址</div>
              <div class="right right-selct"><input v-model="formData.address" readonly type="text" placeholder="请选择详细地址"/></div>
            </div>
            <div class="input-list">
              <div class="left"><i>*</i>联系人</div>
              <div class="right"><input v-model="formData.name" type="text" placeholder="请输入联系人"/></div>
            </div>
            <div class="input-list">
              <div class="left"><i>*</i>联系电话</div>
              <div class="right"><input v-model="formData.phone" type="number" placeholder="请输入联系电话"/></div>
            </div>
          </div>
          <div class="help-content-box">
            <div class="textarea-list">
              <div class="top"><i>*</i>内容</div>
              <div class="bottom">
                <textarea v-model="formData.hardDescription" placeholder="请输入内容详情"></textarea>
              </div>
            </div>
            <div class="switch-box">
              <div class="left">上传图片视频</div>
              <div class="right">
                <van-switch accept="image/*" v-model="checked" size="24px" inactive-color="#ccc" />
              </div>
            </div>
          </div>
          <div class="help-content-box" v-if="checked">
            <div class="file-box">
              <div class="top">上传图片</div>
              <ul class="bottom">
                <li v-if="formData.imgUrl!=''" v-for="(item,i) in formData.imgUrl.split(',')" :key="item"><van-icon @click="deletImg(i+1)" class="cols-btn" name="cross"/><img :src="item"></li>
                <li v-if="formData.imgUrl.split(',').length<3" class="file-btn">
                  <van-uploader :after-read="fileUploadAll"/>
                </li>
              </ul>
            </div>
          </div>
          <div class="help-content-box" v-if="checked">
            <div class="file-box">
              <div class="top">上传视频</div>
              <ul class="bottom">
                <li v-if="formData.videoUrlImg" class="cols-btn" name="cross"><van-icon @click="deletVideo(i+1)" class="cols-btn" name="cross"/><img :src="formData.videoUrlImg"></li>
                <li  class="file-btn">
                  <van-uploader accept="video/*" :after-read="fileUploadAllvideo"/>
                </li>
              </ul>
            </div>
          </div>
          <div class="submit-btn" @click="verificationData">确定</div>
      </div>
      <!--类型下拉-->
      <lianjixiala v-if="hardTypeStute" :lj="hardType" @lianjixialaData="politicsData"></lianjixiala>
      <!--所属区域-->
      <quyu_cun_zheng v-if="quyucunzhengSelct" @cunzheng="cunzhengData"></quyu_cun_zheng>
      <!--地图-->
      <locationMap v-if="mapStaus" @e-word="receiveMap"></locationMap>
      <!--loading-->
      <loading v-if="loadingStatus"></loading>
    </div>
</template>

<script>
  import {config} from "../js/httpConfig"
  import {pu} from "../js/public"
  import lianjixiala from '@/components/publicMould/lianjixiala' //联级下拉
  import quyu_cun_zheng from '@/components/publicMould/quyu_cun_zheng' //村镇下拉
  import locationMap from '@/components/publicMould/locationMap'//定位地图
  import loading from '@/components/publicMould/loading'
export default {
    name: "faqiqiuzhu",
  components:{lianjixiala,quyu_cun_zheng,locationMap,loading},
  data(){
      return{
        checked:false,
        formData:{
          helpAppId:sessionStorage.appId,//appId
          title:'',//主题
          hardType:'-1',//类型 0咨询,1投诉,2求助,3建议,4意见,5其他
          orgId:'',//所属区域
          address:'',//详细地址
          name:'',//联系人
          phone:'',//联系人手机号
          hardDescription:'',//内容
          imgUrl:'',//上传图片
          videoUrl:'',//上传视频
          videoUrlImg:'',//视频封面
        },
        hardType:[
          {text:'咨询',id:0},
          {text:'投诉',id:1},
          {text:'求助',id:2},
          {text:'建议',id:3},
          {text:'意见',id:4},
          {text:'其他',id:5},
        ],
        hardTypeStute:false,
        hardTypeTxt:'',
        quyucunzhengSelct:false,
        orgIdText:'',
        loadingStatus:false,
        mapStaus:false,
      }
  },
  methods:{
      //上传图片
    fileUploadAll(file){
      let _this=this;
      let formData = new FormData();
      formData.append('upload', file.file);
      _this.loadingStatus=true;
      $.ajax({
        url:config.uploadAll,
        type:'post',
        data:formData,
        dataType:'json',
        processData: false,
        contentType: false,
        success:function(res){
          if(res.status==200){
            if(_this.formData.imgUrl==''){
              _this.formData.imgUrl=res.data
            }else{
              _this.formData.imgUrl+=','+res.data
            }
          }else{
            _this.$toast("上传图片失败")
          }
          _this.loadingStatus=false;
        }
      })
    },
    //删除图片
    deletImg(mu){
      let _arr=this.formData.imgUrl.split(',');
      let str="";
      _arr=_arr.splice(mu,1);
      for(let i=0; i<_arr.length; i++){
        if(i){
          str+=','+_arr[i]
        }else{
          str+=_arr[i]
        }
      }
      this.formData.imgUrl=str;
    },
    //上传视频
    fileUploadAllvideo(file){
      let _this=this;
      let formData = new FormData();
      formData.append('upload', file.file);
      _this.loadingStatus=true;
      $.ajax({
        url:config.uploadAll,
        type:'post',
        data:formData,
        dataType:'json',
        processData: false,
        contentType: false,
        success:function(res){
          if(res.status==200){
            let _data=res.data.split(",");
            _this.formData.videoUrl=_data[0];
            _this.formData.videoUrlImg=_data[1];
          }else{
            _this.$toast("上传视频失败")
          }
          _this.loadingStatus=false;
        }
      })
    },
    //删除视频
    deletVideo(){
      this.formData.videoUrl="";
      this.formData.videoUrlImg="";
    },
    politicsData(state){
      this.hardTypeStute=false;
      if(state){
        this.formData.hardType=state.id;
        this.hardTypeTxt=state.text;
      }
    },
    cunzhengData(state){
      if(state){
        this.formData.orgId=state.village;
        this.orgIdText=state.locationName;
      }
      this.quyucunzhengSelct=false
    },
    receiveMap(state){
      this.formData.address=state.address;
      this.mapStaus=false;
    },
    //验证表单
    verificationData(){
      if(this.formData.title==""){
        this.$toast("主题不能为空");
        return
      }
      if(this.formData.hardType=="-1"){
        this.$toast("请选择类型");
        return
      }
      if(this.formData.orgId==""){
        this.$toast("请选择所属区域");
        return
      }
      if(this.formData.address==""){
        this.$toast("请选择详细地址");
        return
      }
      if(this.formData.name==""){
        this.$toast("联系人不能为空");
        return
      }
      if(this.formData.phone==""){
        this.$toast("联系人电话不能为空");
        return
      }else{
        if(!pu.checkPhone(this.formData.phone)){
          this.$toast("联系人电话格式有误");
          return
        }
      }
      if(this.formData.hardDescription==""){
        this.$toast("内容不能为空");
        return
      }
      this.submitData();
    },
    //提交表单
    submitData(){
      let _this=this;
      $.ajax({
        url:config.saveHelpOrder,
        data:this.formData,
        success:res=>{
          if(res.status==200){
            _this.$router.push('/kunnanqiuzhu/index')
          }
        }
      })
    },
  },
}
</script>

<style scoped>
@import "css/style.css";
</style>

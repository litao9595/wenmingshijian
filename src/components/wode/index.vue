<template>
    <div class="mian-box" v-title data-title="我的">
      <div class="user-info">
        <div class="left"><img :src="img"></div>
        <div class="right">{{detils.volunteerName}}</div>
      </div>
      <ul class="user-information" v-if="detils">
        <li>
          <p>{{detils.serviceTime}}小时</p>
          <div>服务时长</div>
        </li>
        <li>
          <p>{{detils.telephone}}</p>
          <div>电话</div>
        </li>
        <li>
          <p>{{timeSpace(detils.createDate)}}</p>
          <div>申请时间</div>
        </li>
      </ul>
      <ul class="nav-box">
        <li :class="nav==1?'active':''" @click="clickNav(1)">接收的任务</li>
        <li :class="nav==2?'active':''" @click="clickNav(2)">发布的任务</li>
      </ul>
      <ul class="task-box">
        <li class="task-list" @click="clickmydetails(item.activityId,item.type)" v-for="(item,i) in list" :key="i">
          <div class="top-box">
            <div class="label" v-if="item.type==1">微心愿</div>
            <div class="label" v-if="item.type==2">百姓点单</div>
            <div class="label" v-if="item.type==3">困难求助</div>
            <div class="label" v-if="item.type==4">志愿者活动</div>
            <p class="title-txt">{{item.activityName}}</p>
            <div class="state-box"  v-if="item.type==1">
              <span v-if="item.status==1">进行中</span>
              <span v-if="item.status==2">已领取</span>
              <span v-if="item.status==3">确认完成</span>
              <span v-if="item.status==4">已完成</span>
            </div>
            <div class="state-box"  v-if="item.type==2">
              <span v-if="item.status==0">未开启</span>
              <span v-if="item.status==1">凑单中</span>
              <span v-if="item.status==2">进行中</span>
              <span v-if="item.status==3">已结束</span>
            </div>
            <div class="state-box"  v-if="item.type==3">
              <span v-if="item.status==0">待接单</span>
              <span v-if="item.status==1">已接单</span>
              <span v-if="item.status==2">待确认</span>
              <span v-if="item.status==3">已完成</span>
            </div>
            <div class="state-box"  v-if="item.type==4">
              <span v-if="item.status==1">招募未开始</span>
              <span v-if="item.status==2">招募中</span>
              <span v-if="item.status==3">招募结束</span>
              <span v-if="item.status==4">活动中</span>
              <span v-if="item.status==5">活动结束</span>
            </div>
          </div>
          <div class="bottom-box">
            <div class="left">
              <p class="txt-p" v-if="item.name">团队名称：{{item.name}}</p>
              <p class="txt-p">时间：{{item.createDate}}</p>
              <p class="txt-p">详细地址：{{item.addressDetail}}</p>
            </div>
            <div class="right" v-if="item.type==1">
              <span v-if="item.status==2" @click.stop="confirmComplete(item.type,item.activityId)">完成</span>
            </div>
            <div class="right" v-if="item.type==1">
              <span v-if="item.status==4" @click.stop="openComment(item.type,item.activityId,item.orgId)" class="comment-btn">评论</span>
            </div>
            <div class="right" v-if="item.type==3">
              <span v-if="item.status==1" @click.stop="confirmComplete(item.type,item.activityId)">完成</span>
            </div>
            <div class="right" v-if="item.type==3">
              <span v-if="item.status==3" @click.stop="openComment(item.type,item.activityId,item.orgId)" class="comment-btn">评论</span>
            </div>
          </div>
        </li>

        <!--<li class="task-list">-->
          <!--<div class="top-box">-->
            <!--<div class="label">求助订单</div>-->
            <!--<p class="title-txt">嘿嘿</p>-->
            <!--<div class="state-box">招募中</div>-->
          <!--</div>-->
          <!--<div class="bottom-box">-->
            <!--<div class="left">-->
              <!--<p class="txt-p">时间：2020-06-07 17:40:12</p>-->
              <!--<p class="txt-p">详细地址：成都市高新区天府大道在往前走</p>-->
            <!--</div>-->
            <!--<div class="right">-->
              <!--<span class="comment-btn">评论</span>-->
            <!--</div>-->
          <!--</div>-->
        <!--</li>-->
      </ul>
      <!--评论弹窗-->
      <div class="comment-poup" v-if="comment">
          <div class="poup-main">
            <div class="poup-head">
              <van-icon @click="comment=false" name="cross" :size="30"/>
              <p>评价</p>
              <span @click="releaseComment">发布</span>
            </div>
            <div class="score-box" v-if="commentType!=1"><van-rate v-model="score" :size="40"/></div>
            <p class="fraction-box" v-if="commentType!=1">{{score}}.0分</p>
            <div class="score-textarea">
              <textarea v-model="commentContent" placeholder="请输入文字评价"></textarea>
            </div>
            <!--<div class="file-box">-->
              <!--<div class="top">上传图片</div>-->
              <!--<ul class="bottom">-->
                <!--<li class="cols-btn"><van-icon class="cols-btn" name="cross"/><img/></li>-->
                <!--<li class="file-btn">-->
                  <!--<van-uploader :after-read="fileUploadAll"/>-->
                <!--</li>-->
              <!--</ul>-->
            <!--</div>-->
          </div>
      </div>
    </div>
</template>

<script>
  import {config} from '../js/httpConfig'
export default {
    name: "index",
  data(){
      return{
        img:require('../image/avatar-bg.png'),
        score:3,
        detils:{},
        list:[],
        fabuList:[],
        nav:1,//1接收2发布
        comment:false,
        commentContent:'',//评论内容
        commentType:1,//评论类型 1微心愿 2百姓点单 3困难求助 4志愿者活动
        coreLianxinId:'',//评论主键Id
        commentOrgId:'',
      }
  },
  created(){
    sessionStorage.appId=this.$route.query.userId;
    sessionStorage.centerId=this.$route.query.centerId;
      this.userDetils();
      this.getFindAcceptTask();
  },
  methods:{
    fileUploadAll(){
      let _this=this;
      let formData = new FormData();
      formData.append('upload', file.file);
      // $.ajax({
      //   url:config.uploadAll,
      //   type:'post',
      //   data:formData,
      //   dataType:'json',
      //   processData: false,
      //   contentType: false,
      //   success:function(res){
      //     if(_this.formData.posterUrl==''){
      //       _this.formData.posterUrl=res.data
      //     }else{
      //       _this.formData.posterUrl+=','+res.data
      //     }
      //   }
      // })
    },
    clickmydetails(id,type){
      //1微心愿 2百姓点单 3困难求助 4志愿者活动
      // addActivity/addActivityDetails
      if(type==1){
        this.$router.push('../weixingyuan/weixingyuanxiangqing?id='+id)
      }else if(type==2){
        this.$router.push('../baixingdiandan/diandanxiangqing?id='+id)
      }else if(type==3){
        this.$router.push('../kunnanqiuzhu/qiuzhuxiangqing?id='+id)
      }else if(type==4){
        this.$router.push('../addActivity/addActivityDetails?id='+id)
      }
    },
    userDetils(){
      let _this=this;
      $.ajax({
        url:config.findVolunteer,
        data:{appId:sessionStorage.appId},
        success:res=>{
          _this.detils=res.data;
        }
      })
    },
    //接收的任务
    getFindAcceptTask(){
      let _this=this;
      $.ajax({
        url:config.findAcceptTask,
        data:{
          appId:sessionStorage.appId,
          pageNo:1,
          pageSize:10,
          type:1,//1志愿者、2志愿者团队
        },
        success:res=>{
          _this.list=_this.list.concat(res.data.list)
        }
      })
    },
    //发布的任务
    getFindPublishTask(){
      let _this=this;
      $.ajax({
        url:config.findPublishTask,
        data:{
          appId:sessionStorage.appId,
          pageNo:1,
          pageSize:10,
          type:1,//1志愿者、2志愿者团队
        },
        success:res=>{
          // _this.fabuList=res.data.list
          _this.list=_this.list.concat(res.data.list)
        }
      })
    },
    //导航切换
    clickNav(type){
      this.list=[];
      this.nav=type;
      if(type==1){
        //接收的任务
        this.getFindAcceptTask()
      }else{
        //发布的任务
        this.getFindPublishTask();
      }
    },
    //时间空格处理
    timeSpace(str){
      let _str=str+'';
      return _str.split(" ")[0]
    },
    //确认完成
    confirmComplete(type,id){
      //1微心愿 2百姓点单 3困难求助 4志愿者活动
      let _this=this;
      let _url="";
      if(type==1){
        _url=config.lainxinHelpSure;
      }else if(type==2){

      }else if(type==3){
        _url=config.updateAndSendMessage;
      }else{

      }
      $.ajax({
        url:_url,
        data:{
          receiverAppId:sessionStorage.appId,
          id:id,
        },
        success:res=>{
          if(res.code==200){
            //刷新列表
            _this.list=[];
            if(_this.nav==1){
              this.getFindAcceptTask()
            }else{
              this.getFindPublishTask();
            }
          }else{
            _this.$toast(res.msg)
          }
        }
      })
    },
    //打开评论框
    openComment(type,id,orgId){
      this.commentContent="";
      this.coreLianxinId=id;
      this.orgId=orgId;
      this.commentType=type;
      this.comment=true;
    },
    //发布评论
    releaseComment(){
      if(this.commentContent==""){
        this.$toast("评论内容不能为空");
        return
      }
      //评论类型 1微心愿 2百姓点单 3困难求助 4志愿者活动
      if(this.commentType==1){
        this.submitComment(1);
      }else if(this.commentType==3){
        this.submitComment(0);
      }
    },
    //微心愿评论
    submitComment(type){
      let _this=this;
      $.ajax({
        url:config.saveComment,
        type:'post',
        data:{
          appId:sessionStorage.appId,
          nikeName:sessionStorage.nickName,
          header:sessionStorage.header,//用户头像
          star:this.score,
          content:this.commentContent,
          activityId:this.coreLianxinId,
          type:type,//0求助订单的评论 1连心桥的评论 2求助订单评论的评论 3连心桥评论的评论 4点单的评论 5点单的评论的评论
          orgId:this.commentOrgId,

        },
        success:res=>{
          _this.$toast(res.message);
          _this.comment=false;
        }
      })
    },
  },
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import "css/style";
</style>

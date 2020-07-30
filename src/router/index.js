import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/components/index'
import ceshi from '@/components/ceshi'
import addActivity from '@/components/addActivity/index'//志愿活动新增活动
import zhiyuanhome from '@/components/addActivity/home'//志愿活动
import addActivityDetails from '@/components/addActivity/addActivityDetails'//志愿活动详情
import zhiyuanzheshengqing from '@/components/zhiyuanzheshengqing/index'//志愿者申请
import tuanduishengqing from '@/components/tuanduishengqing/index'//团队申请
import tuanduixiangqing from '@/components/tuanduishengqing/tuanduixiangqing'//团队详情
import chuangjiantuandui from '@/components/tuanduishengqing/chuangjiantuandui'//创建团队
import kunnanqiuzhu from '@/components/kunnanqiuzhu/index'//困难求助
import qiuzhuxiangqing from '@/components/kunnanqiuzhu/qiuzhuxiangqing'//困难求助详情
import faqiqiuzhu from '@/components/kunnanqiuzhu/faqiqiuzhu'//困难求助 发起求助
import baixingdiandan from '@/components/baixingdiandan/index'//百姓点单
import diandanxiangqing from '@/components/baixingdiandan/diandanxiangqing'//百姓点单详情
import weixingyuan from '@/components/weixingyuan/index'//微心愿
import weixingyuanxiangqing from '@/components/weixingyuan/weixingyuanxiangqing'//微心愿详情
import tuanduifengcai from '@/components/tuanduifengcai/index'//团队风采
import fengcaiDetails from '@/components/tuanduifengcai/fengcaiDetails'//团队风采详情
import tuanduihuodong from '@/components/tuanduifengcai/tuanduihuodong'//团队风采下团队活动
import shijianzhengdi from '@/components/shijianzhengdi/index'//实践阵地
// import zddetils from '@/components/shijianzhengdi/zddetils'//实践阵地详情
import shijianzhengdixiangqing from '@/components/shijianzhengdi/shijianzhengdixiangqing'//实践阵地详情
import wode from '@/components/wode/index'//我的
import wodexiangqing from '@/components/wode/wodexiangqing'//我的详情
import zhengdihuodong from '@/components/zhengdihuodong/index'//阵地活动
import zhengdihuodongxiang from '@/components/zhengdihuodong/zhengdihuodongxiang'//阵地活动详情
import duoxuan from '@/components/publicMould/duoxuan' //多选下拉
import lianjixiala from '@/components/publicMould/lianjixiala' //联级下拉
import dateTime from '@/components/publicMould/dateTime' //时间下拉
import mapBox from '@/components/publicMould/mymap' //地图
import jgSelct from '@/components/publicMould/jgSelct' //籍贯下拉
import quyu_cun_zheng from '@/components/publicMould/quyu_cun_zheng' //村镇下拉
import loading from '@/components/publicMould/loading'
import locationMap from '@/components/publicMould/locationMap'//定位地图
import detilsMap from '@/components/publicMould/detilsMap'//浮窗地图

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/ceshi',
      name: 'ceshi',
      component: ceshi
    },
    {
      path: '/addActivity/index',
      name: 'addActivity',
      component: addActivity
    },
    {
      path: '/addActivity/addActivityDetails',
      name: 'addActivityDetails',
      component: addActivityDetails
    },
    {
      path: '/addActivity/home',
      name: 'zhiyuanhome',
      component: zhiyuanhome
    },
    {
      path: '/zhiyuanzheshengqing/index',
      name: 'zhiyuanzheshengqing',
      component: zhiyuanzheshengqing
    },
    {
      path: '/tuanduishengqing/index',
      name: 'tuanduishengqing',
      component: tuanduishengqing
    },
    {
      path: '/tuanduishengqing/tuanduixiangqing',
      name: 'tuanduixiangqing',
      component: tuanduixiangqing
    },
    {
      path: '/tuanduishengqing/chuangjiantuandui',
      name: 'chuangjiantuandui',
      component: chuangjiantuandui
    },
    {
      path: '/kunnanqiuzhu/index',
      name: 'kunnanqiuzhu',
      component: kunnanqiuzhu
    },
    {
      path: '/kunnanqiuzhu/qiuzhuxiangqing',
      name: 'qiuzhuxiangqing',
      component: qiuzhuxiangqing
    },
    {
      path: '/kunnanqiuzhu/faqiqiuzhu',
      name: 'faqiqiuzhu',
      component: faqiqiuzhu
    },
    {
      path: '/baixingdiandan/index',
      name: 'baixingdiandan',
      component: baixingdiandan
    },
    {
      path: '/baixingdiandan/diandanxiangqing',
      name: 'diandanxiangqing',
      component: diandanxiangqing
    },
    {
      path: '/weixingyuan/index',
      name: 'weixingyuan',
      component: weixingyuan
    },
    {
      path: '/weixingyuan/weixingyuanxiangqing',
      name: 'weixingyuanxiangqing',
      component: weixingyuanxiangqing
    },
    {
      path: '/tuanduifengcai/index',
      name: 'tuanduifengcai',
      component: tuanduifengcai
    },
    {
      path: '/tuanduifengcai/fengcaiDetails',
      name: 'fengcaiDetails',
      component: fengcaiDetails
    },
    {
      path: '/tuanduifengcai/tuanduihuodong',
      name: 'tuanduihuodong',
      component: tuanduihuodong
    },
    {
      path: '/shijianzhengdi/index',
      name: 'shijianzhengdi',
      component: shijianzhengdi
    },
    {
      path: '/shijianzhengdi/shijianzhengdixiangqing',
      name: 'shijianzhengdixiangqing',
      component: shijianzhengdixiangqing
    },
    {
      path: '/wode/index',
      name: 'wode',
      component: wode
    },
    {
      path: '/wode/wodexiangqing',
      name: 'wodexiangqing',
      component: wodexiangqing
    },
    {
      path: '/zhengdihuodong/index',
      name: 'zhengdihuodong',
      component: zhengdihuodong
    },
    {
      path: '/zhengdihuodong/zhengdihuodongxiang',
      name: 'zhengdihuodongxiang',
      component: zhengdihuodongxiang
    },
    {
      path: '/publicMould/duoxuan',
      name: 'duoxuan',
      component: duoxuan
    },
    {
      path: '/publicMould/lianjixiala',
      name: 'lianjixiala',
      component: lianjixiala
    },
    {
      path: '/publicMould/dateTime',
      name: 'dateTime',
      component: dateTime
    },
    {
      path: '/publicMould/mymap',
      name: 'mapBox',
      component: mapBox
    },
    {
      path: '/publicMould/jgSelct',
      name: 'jgSelct',
      component: jgSelct
    },
    {
      path: '/publicMould/quyu_cun_zheng',
      name: 'quyu_cun_zheng',
      component: quyu_cun_zheng
    },
    {
      path: '/publicMould/loading',
      name: 'loading',
      component: loading
    },
    {
      path: '/publicMould/locationMap',
      name: 'locationMap',
      component: locationMap
    },
    {
      path: '/publicMould/detilsMap',
      name: 'detilsMap',
      component: detilsMap
    },
  ]
})

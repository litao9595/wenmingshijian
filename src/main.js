// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import store from './store/store'
Vue.use(Vant);
Vue.config.productionTip = false
import { Notify } from 'vant';
Vue.use(Notify);
import { Toast } from 'vant';
Vue.use(Toast);
import vueJsonp from 'vue-jsonp'
Vue.use(vueJsonp);
import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe);
Vue.use(SwipeItem);
import { List } from 'vant';
Vue.use(List);
import { Rate } from 'vant';
Vue.use(Rate);
import { Loading } from 'vant';
Vue.use(Loading);
Vue.config.productionTip = false;
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'wry2MZK36yxGmYI79oSpvf9bCMVpBk7h'
});
// 设置浏览器标题
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

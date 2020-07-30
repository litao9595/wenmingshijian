import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
var state={
  count:0,
  resumeData:{},
}
//定义getters
const getters={
  count(state){
    return state.count
  }
}
//定义actions,要执行的操作,如流程判断、异步请求
const actions={
  // increment(context){
  //   console.log(context)
  //   context.commit('increment')
  // }
  increment({commit,state}){
    if(state.count<10){
      commit('increment');  //提交一个名为increment 的变化，名称可自定义，可认为是类型名
    }
  },
  reduce({commit,state}){
    commit('reduce');
  }
}
//定义mutations ,处理状态（数据）的改变
const mutations={
  increment(state){
    state.count++
  },
  reduce(state){
    state.count--
  },
  resumeList(state,data){
    //获取简历
    state.resumeData=data
  },
  dataAppId(state,data){
    //appId
    state.appId=data
  },
};



//创建store对象
const store=new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
export default store;

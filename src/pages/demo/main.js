/**
 *  2019/3/14  lize
 */

import Vue from 'vue'

import App from './App.vue'

import router from './router'

import store from './store'

// import Http from "@/common/modules/http"

// import publicValue from "@/common/modules/publicValue"

// import 'lib-flexible'

Vue.use(Http,['$http']);

Vue.prototype.$Height=  window.innerHeight - 68- 54;

Vue.prototype.ENV = process.env.NODE_ENV; //当前环境

window.onresize = () =>{
  
  console.log(window.innerHeight,Vue.prototype.$Height);
  
  Vue.prototype.$Height=  window.innerHeight - 68- 54;
  
};

Vue.config.productionTip = false;

new Vue({
  
  router,
  
  store,
  
  render: h => h(App)
  
}).$mount('#app');

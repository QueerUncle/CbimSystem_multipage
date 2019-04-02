/**
 *  2019/3/14  lize
 */

import Vue from 'vue'

import App from './App.vue'

import router from './router'

import store from './store'

import '../../../public/css/reset.css';

import 'lib-flexible'

import Http from '../../extend/http'

import Vant from 'vant';

import 'vant/lib/index.css';

import VueTouch from 'vue-touch'

import fs from '../../extend/fs/index'

Vue.use(Vant);

Vue.use(Http,['$http','$cancel']);

Vue.use(VueTouch, {name: 'v-touch'});

Vue.prototype.$fs = fs;

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  
  window.scrollTo(0,0);
  
  if (to.meta.title) {
    
    if(to.meta.title){
      
      document.title = to.meta.title
      
    }
    
  }
  
  next()
  
});

new Vue({
  
  router,
  
  store,
  
  render: h => h(App),
  
}).$mount('#app');

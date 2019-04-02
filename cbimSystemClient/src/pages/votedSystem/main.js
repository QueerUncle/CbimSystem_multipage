/**
 *  2019/3/14  lize
 */

import Vue from 'vue'

import App from './App.vue'

import Http from '../../extend/http'

import 'lib-flexible'

import VueTouch from 'vue-touch'

import '../../../public/css/reset.css';

import Vant from 'vant';

import 'vant/lib/index.css';

import router from './router'

import store from './store'

import fs from '../../extend/fs/index'

Vue.use(Vant);

Vue.use(Http,['$http','$cancel']);

Vue.use(VueTouch, {name: 'v-touch'});

Vue.prototype.$fs = fs;

Vue.config.productionTip = false;

new Vue({
  
  router,
  
  store,
  
  render: h => h(App),
  
}).$mount('#app');

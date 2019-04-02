/**
 *  2019/3/14  lize
 */

import Vue from 'vue'

import App from './App.vue'

import Http from '../../extend/http'

import 'lib-flexible'

import '../../../public/css/reset.css';

import Vant from 'vant';

import 'vant/lib/index.css';

Vue.use(Vant);

Vue.use(Http,['$http','$cancel']);

Vue.config.productionTip = false;

new Vue({
  
  render: h => h(App),
  
}).$mount('#app');

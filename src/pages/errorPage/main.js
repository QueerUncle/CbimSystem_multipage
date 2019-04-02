/**
 *  2019/3/14  lize
 */

import Vue from 'vue'

import App from './App.vue'

import 'lib-flexible'

import '../../../public/css/reset.css';

Vue.config.productionTip = false;

new Vue({
  
  render: h => h(App),
  
}).$mount('#app');

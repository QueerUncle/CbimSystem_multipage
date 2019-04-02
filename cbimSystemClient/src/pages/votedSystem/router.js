/**
 *  2019/3/14  lize
 */

import Vue from 'vue'

import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  
  routes: [
    
    {
      
      path: '/',
      
      component: () => import('./views/getUserInfo.vue')
      
    },
  
    {
    
      path:'/answerSheet',
    
      meta:{
      
        title:'答题页'
      
      },
    
      component:() =>import('./views/answerSheet.vue')
    
    },
    
  ]
  
})

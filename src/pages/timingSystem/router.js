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
      
      meta:{
        
        title:"工时报备"
        
      },
      
      component: () => import('./views/calenderTem.vue')
      
    },
    {
    
      path: '/ReportedManHour',
      
      meta:{
      
        title:"计时系统"
      
      },
    
      component: () => import('./views/ReportedManHour.vue')
    
    },
    
  ]
  
})

/**
 *  2019/3/14  lize
 */
import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  
  state: {
    
      userInfo:{
        
        user_id:"1",
        
        user_name:"",
        
        ent_code:"123456",
        
        ent_title:"测试企业"
        
      },
      
      phoneInfo:'',
    
      projectList:[],
  
      WorkHoursList:[],
    
  },
  mutations: {
  
  },
  actions: {
  
  }
  
})

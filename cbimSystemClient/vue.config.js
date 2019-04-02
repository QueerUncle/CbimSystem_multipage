/**
 *  2019/3/14  lize
 */

const utils  = require('./utils/utils');

module.exports = {
  
  baseUrl:'',
  
  outputDir: '../../static/appClient/TimeAndVotedProject',
  
  assetsDir: "",
  
  pages: utils.getPages(),
  
  lintOnSave: false,
 
  productionSourceMap:false,
  
  css: {
    
    loaderOptions: {
      
      css: {},
      
      postcss: {
        
        plugins: [
          
          require('postcss-px2rem')({

            "remUnit": 37.5,
            
          })
        
        ]
        
      }
      
    }
    
  },
  
  devServer: {
    
    port: 8881, // 端口号
    
    host: '0.0.0.0',
    
    https: false, // https:{type:Boolean}
    
    open: false, //配置自动启动浏览器
    
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    
    disableHostCheck: true, //  新增该配置项
    
    proxy: {
    
      // '/api': {
      //
      //   target:'http://127.0.0.1:8088',
      //
      //   // ws: true,
      //
      //   changeOrigin: true,
      //
      //   pathRewrite: {
      //
      //     '^/api': ''  // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
      //
      //   }
      //
      // },
  
      '/mocks': {

        target:'http://api.china-bim.org/mock/75/api',

        // ws: true,

        changeOrigin: true,

        pathRewrite: {

          '^/mocks': ''  // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'

        }

      },
      '/jjc': {
    
        target:'http://10.80.12.107:24680/api',
    
        // ws: true,
    
        changeOrigin: true,
    
        pathRewrite: {
      
          '^/jjc': ''  // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
      
        }
    
      },
      
      
    
    },  // 配置多个代理
    
  },
  
};

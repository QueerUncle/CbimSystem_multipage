/**
 *  2018/10/17  lize
 */
const glob = require ("glob");

const fs = require ("fs");

const path = require ('path');

module.exports = {

    getPages: () => {

        const globPathHtml = ['./src/**/index.html']; // 入口模板正则

        const globPathJs = ['./src/**/main.js']; // 入口脚本正则

        const splitArray = (list) => {

            let newAry = [];

            if (list.length > 0) {

                for (let entry of list) {

                    entry = entry.substring (0, entry.lastIndexOf ('/'));

                    newAry.push (entry);

                }

            }

            return newAry;

        };
        
        const WriteFileFn = (src,path,writeContent) =>{
  
          fs.exists (src, (publicxists) => {
            
              if(publicxists){
  
                fs.writeFile (path,writeContent, 'utf8', (error) => {
    
                  if (error) return console.log (error);
    
                })
              
              }else{
  
                fs.mkdir (src, (err) => {
    
                  if (err) return console.error (err);
    
                  fs.writeFile (path,writeContent, 'utf8', (error) => {
      
                    if (error) return console.log (error);
      
                  })
    
                });
                
              }
            
          })
        
        };

        let pages = {};
        
        let PageDetal = "";
        
        let PageCount = {};

        let confDemo = {};

        let fileHtmlList = splitArray (glob.sync (...globPathHtml));

        let fileJsList = splitArray (glob.sync (...globPathJs));

        for (let entry of fileHtmlList) {

            if (fileJsList.indexOf (entry) >= 0) {
              
                if (!entry.includes ('demo')) {

                    let paths = entry + '/conf.json';

                    let data = JSON.parse (fs.readFileSync (paths, 'utf-8'));
                  
                    pages[data.filename] = {

                        entry: `${entry}/main.js`,

                        template: `${entry}/index.html`,

                        filename: `${data.filename}.html`,

                        title: `${data.title}`,

                    };

                    confDemo[data.filename] = `${data.filename}.html`;
  
                    PageCount[entry.split('/')[entry.split('/').length-1]] = data;
                    
                    PageDetal+="#### "+entry.split('/')[entry.split('/').length-1]+"："+data.title+"\n>`\n文件名："+data.filename+"\n`\n\n>`\n文件描述："+data.description+"\n`\n";
                  
                }

            }

        };
        
        let stringConfdemo = JSON.stringify ({code   : 200, success: true, message: "", data   : confDemo});
  
        WriteFileFn('./public','./public/RouterInfo.conf.json',stringConfdemo);
        
        WriteFileFn('./src/pages','./src/pages/Page.description.md',PageDetal);

        console.log (pages, '这里是单页对象');

        console.log (confDemo, '这里是配置模板');

        return pages;

    }

};


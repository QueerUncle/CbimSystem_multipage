/**
 *  2019/4/1  lize
 */
var fs = require( 'fs' );
const glob = require('glob');
/**
 * JS文件拷贝
 * @param src
 * @param dst
 */
let remoevePath = null
var callbackFile = function( src, dst ){
  fs.readFile(src,'utf8',function(error,data){
    if(error){
      console.log(error);
      return false;
    }
    fs.writeFile(dst,data.toString(),'utf8',function(error){
      if(error){
        console.log(error);
        return false;
      }
      if(dst.includes('.map')){
        let srcName = src.split('/')[4];
        fs.unlink(`../static/js/${srcName}.map`,function () {// 删除map
        })
        fs.unlink(`../static/js/${srcName}`,function () {// 删除js
        })
      }else{//JS写入成功
        callbackFile(dst,`${dst}.map`)
      }
    })
  })
};
// 复制目录
glob.sync( '../static/js/*.js').forEach((filepath,name) => {
  
  console.log(filepath,'filepath')
  let fileNameList = filepath.split('.');
  console.log(fileNameList,'fileNameList')
  let fileName = fileNameList[2].split('/')[3];// 多页面页面目录
  console.log(fileName,'fileName')
  
  let copyName = filepath.split('/')[3];
  
  console.log(copyName,'copyName')
  let changeDirectory = `../static/${fileName}/js`;// 多页面JS文件地存放址
  if(!fileName.includes('chunk-vendors')){
    fs.exists( changeDirectory, function( exists ){
      if( exists ){// 已存在
        // console.log(`${fileName}下JS文件已经存在`)
        callbackFile(filepath,`${changeDirectory}/${copyName}`)
      } else{// 不存在
        fs.mkdir( changeDirectory, function(){
          callbackFile(filepath,`${changeDirectory}/${copyName}`)
          // console.log(`${fileName}下JS文件创建成功`)
        });
      }
    });
  }
});

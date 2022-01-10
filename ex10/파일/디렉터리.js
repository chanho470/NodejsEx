var fs = require('fs')
//fs.mkdir('./docs','0666',function(err){
//    if(err) throw err;
//    console.log('새로운 doc 폴더 생성')
//});

fs.rmdir('./docs',function(err){
    if(err) throw err;
    console.log('새로운 doc 폴더 삭제')
});
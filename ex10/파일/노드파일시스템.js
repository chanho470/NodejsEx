//var fs= require('fs')
//var data= fs.readFileSync('../package.json','utf8');
//console.log(data);


var fs= require('fs')
//var data= fs.readFileSync('../package.json','utf8',function(err,data){
//    console.log(data);
//});
//console.log('프로젝트 안의 파일읽기');

fs.writeFile('./output.txt','hello world',function(err){
    if(err){
        console.log('err :' + err);
    }
    console.log('output txt 파일에 데이터 쓰기 완료')
});

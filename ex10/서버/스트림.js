
var fs  = require('fs');
var http = require('http');
var server = http.createServer();
var port =3000;

server.listen(port,function(){
    console.log("웹서버 시작 %d",port);
});


server.on("request",function(req,res){
    console.log("클라이언트 요청");
    var filename ='aaa.jpg';
    var infile = fs.createReadStream(filename,{flags:'r'});
    infile.pipe(res);
})
let express =require('express') ,http =require('http');
let app =express();

app.use(function(req,res,next){
    console.log("첫 번째 미들웨어에서 요청을 처리함");
    // res.send({name:'코난',age:'10'});
    // res.redirect("http://google.co.kr");
    req.user='conan';
    next();
});

// app.use(function(req,res,next){
//     console.log("첫 번째 미들웨어에서 요청을 처리함");
//     res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
//     res.end("<h1>서버응답</h1>");
// })

// app.use('/',function(req,res,next){
//     console.log("두 번째 미들웨어에서 요청을 처리함");
//     res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
//     res.end("<h1>서버에서 "+req.user+"가 응답 중</h1>");
// })

app.use(function(req,res,next){
    console.log("첫 번째 미들웨어에서 요청을 처리함");
    var userAgent =req.header("User-Agent");
    var paramName =req.query.name;
    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>서버에서 응답한 결과</h1>');
    res.write('<div><p> User-Agent' +userAgent+'</p></div>');
    res.write('<div><p> paramName : ' +paramName+'</p></div>');
    res.end();
})

app.listen(3000,function(){
    console.log('express 서버가 3000번 포트에서 시작')
})
const express = require("express"),path=require('path'),http =require('http');
const { append } = require("express/lib/response");

var router =express.Router();
var app =express();

//바디파서하는거
//post의 경우 url이 아닌 본문(body)영역에 들어가있기 때문에 아래와 같이 사용함 (body-parser란 모듈 사용)
var bodyParser = require('body-parser'),static =require('serve-static');
//포트 3000으로 맞추는거
app.set('port',process.env.PORT||3000);
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//public 폴더 이름이면 /public으로 하나봄
app.use('/public',static(path.join(__dirname,'public')))
//라우터 경로 지정해서 포스트방식으로 넘겨주나봄
router.route('/process/login').post(function(req,res){
    //콘솔 띄워주나봄
    console.log('/process/login 처리함');
    //바디에 있는 유저아이디 쿼리에있는 유저아이디를 확인함 
    var paramUserId =req.body.userId || req.query.userId;
    var paramUserPwd =req.body.userPwd || req.query.userPwd;
    //인터넷 상태 200, Content-Type: 저거 넣어주나봄
    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>서버에서 응답한 결과</h1>');
    res.write('<div><p> Param id' +paramUserId+'</p></div>');
    res.write('<div><p> Param Pwd : ' +paramUserId+'</p></div>');
    res.write("<br><br><a href='/public/login.html'>로그인 페이지로 돌아가기</a>")
    res.end();
});

app.use('/',router);
app.all("*",function(req,res){
    res.status(404).send('<h1>페이지를 찾을 수 없습니다.</h1>')
})
app.listen(3000,function(){
    console.log('express 서버가 3000번 포트에서 시작')
})
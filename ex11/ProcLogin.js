const express = require("express"),path=require('path'),http =require('http');
const { append } = require("express/lib/response");
var expressSession =require('express-session');

var router =express.Router(); //컨트롤러 역할을함
var bodyParser = require('body-parser'),static =require('serve-static');
var app =express();

app.set('port',process.env.PORT||3000);
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/public',static(path.join(__dirname,'public')))
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized :true
}));

router.route('/process/login').post(function(req,res){
    console.log('/process/login 호출됨');
    var paramUserId =req.body.userId || req.query.userId;
    var paramUserPwd =req.body.userPwd || req.query.userPwd;

    if(req.session.user){
        console.log('이미 로그인되어 상품페이지로 이동합니다');
        res.redirect('/public/product.html');
    }
    else{
        req.session.user ={id : paramUserId , name :'코난' ,authorized:true};
        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
        res.write('<h1>로그인 성공</h1>');
        res.write('<div><p> Param id : ' +paramUserId+'</p></div>');
        res.write('<div><p> Param Pwd : ' +paramUserId+'</p></div>');
        res.write("<br><br><a href='/process/product'>상품 페이지로 돌아가기</a>")
        res.end();
    }

}) 

app.use('/',router);
app.all("*",function(req,res){
    res.status(404).send('<h1>페이지를 찾을 수 없습니다.</h1>')
})
app.listen(3000,function(){
    console.log('express 서버가 3000번 포트에서 시작')
})
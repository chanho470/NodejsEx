const express = require("express"),path=require('path'),http =require('http');
const { append } = require("express/lib/response");

var cookieParser =require('cookie-parser')
var router =express.Router(); //컨트롤러 역할을함
var bodyParser = require('body-parser'),static =require('serve-static');
var app =express();

app.use(cookieParser());
app.set('port',process.env.PORT||3000);
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/public',static(path.join(__dirname,'public')))

router.route('/process/setUserCookie').get(function(req,res){ //get 방식 파라메타 받아옴
    console.log('/process/setUserCookie 호출됨');
    
    res.cookie('user',{
        id:'conan',
        name:'코난',
        authorized:true
    });
    //redirect로 응답
    res.redirect('/process/showCookie')
});
router.route('/process/showCookie').get(function(req,res){ //get 방식 파라메타 받아옴
    console.log('/process/showCookie 호출됨');
    
    res.send(req.cookies);
});

app.use('/',router);
app.all("*",function(req,res){
    res.status(404).send('<h1>페이지를 찾을 수 없습니다.</h1>')
})
app.listen(3000,function(){
    console.log('express 서버가 3000번 포트에서 시작')
})
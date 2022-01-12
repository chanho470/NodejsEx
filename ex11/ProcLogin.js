const express = require("express"),path=require('path'),http =require('http');
const { append } = require("express/lib/response");
var expressSession =require('express-session');

var router =express.Router(); //컨트롤러 역할을함
var bodyParser = require('body-parser'),static =require('serve-static');
var app =express();
/////////////////////////////////////////////////////////////
// 못찾는 페이지
var expressErrorHandler =require('express-error-handler');
var errorHandler =expressErrorHandler({
    static:{
        '404':'./public/404.html'
    }
});

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//파일 업로드용 미들웨어
var multer =require('multer');
var fs = require('fs');
// 클라이언트에서 ajax로 요청시 CORS다중 서버 접속 지원
var cors = require('cors');
// public 폴더와 업로드폴더 오픈
app.use('/public',static(path.join(__dirname,'upload')))
app.use(cors());
/////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////
//파일 제한 10개 1기가 
// multer 미들웨어 사용 미들웨어 사용 순서 중요 body-parser -> multer -> router
var storage =multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,'uploads')
    },filename:function(req,file,callback){
        callback(null,file.originalname+Date.now())
    }
});
var upload = multer({
    storage:storage,
    limits:{
        files : 10,
        fileSize : 1024*1024*1024
    }
});
/////////////////////////////////////////////////////////////

app.set('port',process.env.PORT||3000);
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
// 로그아웃 라우팅함수 
router.route('/process/logout').get(function(req,res){
    console.log('/process/logout 호출됨');
    if(req.session.user){
        console.log('로그아웃합니다');
        req.session.destroy(function(err){
            if(err){throw err;}
            console.log('세션을 삭제하고 로그아웃을함');
            res.redirect('/public/login.html');
        });
    }else{
        console.log('아직 로그인 되어있지 않음');
        res.redirect('/public/login.html');
    }
});
//세션 정보 확인해 상품페이지로 이동함
router.route('/process/product').get(function(req,res){
    console.log('/process/product 호출됨');
    if(req.session.user){
        console.log('상품 페이지로 이동함');
        res.redirect('/public/product.html');
    }
    else{
        console.log('로그인 안되어 로그인 페이지로 이동함');
        res.redirect('/public/login.html');
    }
});

router.route('/process/upload').post(upload.array('uploadedFile',1), function(req,res){
    console.log('/process/upload 호출됨');
    try{
        var files =  req.files;
        console.dir("==========업로드된 첫번째 파일 정보=============");
        console.dir(req.files[0]);
        console.dir('#====================#');
        var originalname ='', filename='',mimetype='',size=0;
        if(Array.isArray(files)){
            console.log("배열에 들어가있는 파일 개수 : %d",files.length);
            for(var index=0;index < files.length ;index++){
                originalname = files[index].originalname;
                filename = files[index].filename;
                mimetype = files[index].mimetype;
                size=files[index].size;
            }
        }else{
            console.log("파일 갯수 : 1");
            originalname = files[index].originalname;
            filename = files[index].name;
            mimetype = files[index].mimetype;
            size=files[index].size;
        }
        console.log("현재 파일정보 :" +originalname+' , '+filename + ',' +mimetype +','+size);
        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
        res.write('<h3>파일 업로드 성공</h3>');
        res.write('<hr/>');
        res.write('<p> 원본 파일명 : ' +originalname+'->저장 파일명: '+filename+'</p>');
        res.write('<p> MIME TYPE : ' +mimetype+'</p>');
        res.write('<p> 파일크기 : ' +size+'</p>');
        res.end();
    }catch(err){
        console.dir(err.stack);
    }
});


app.use('/',router);
// app.all("*",function(req,res){
//     res.status(404).send('<h1>페이지를 찾을 수 없습니다.</h1>')
// })

///////////////////////////////////
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);
///////////////////////////////////
app.listen(3000,function(){
    console.log('express 서버가 3000번 포트에서 시작')
})
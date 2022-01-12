let express = require("express"),path=require('path'),http =require('http');

let bodyParser = require('body-parser');
let cookieParser =require('cookie-parser');
let static =require("serve-static");
let errorHandler=require("errorhandler");

let expressErrorHandler =require('express-error-handler');
let expressSession =require("express-session");
let app = express();

let MongoClient =require('mongodb').MongoClient;
let database;

app.set('port',process.env.PORT||3000);
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/public',static(path.join(__dirname,'public')))

function connectDB() {
    let databaseUrl ='mongodb://localhost:27017/';
    MongoClient.connect(databaseUrl,function(err,client){
        database = client.db('bitDB');
        if(err) throw err;
        console.log("데이터 베이스에 연결되었습니다  " + databaseUrl);
    });
}
////////////////////////////////////////////////////////////////////

var authMember =function(database,userId,userPwd,callback){
    console.log('authMember 호출됨 ' + userId + userPwd);
    var members =database.collection("Members");
    members.find({"userId":userId,"userPwd":userPwd}).toArray(function(err,docs){
        if(err){
            callback(err,null);
            return;
        }
        if(docs.length>0){ //조회한 레코드가 있는 경우 콜백 함수를 호출하면서 조회결과 전달
            console.log("아이디[%s] 패스워드[%s]가 일치하는 사용자 찾음.",userId,userPwd);
            callback(null,docs);
        }else{
            console.log("일치하는 사용자를 찾지못함");
            callback(null,null);
        }
    });
}
var addMember =function(database,userId,userPwd,callback){
    console.log('addMember 호출됨 ' + userId +" , "+ userPwd);
    var members =database.collection("Members");
    members.insertMany([{"userId":userId,"userPwd":userPwd}], function(err,result){
        if(err){
            callback(err,null);
            return;
        }
        if(result.insertedCount>0){ 
            console.log("사용자 레코드 추가됨"+result.insertedCount);
        }else{
            console.log("추가되지 않았음");
        }
        callback(null,result);
    });
}

var updateMember =function(database,userId,userPwd,callback){
    console.log('updateMember 호출됨 ' + userId +" , "+ userPwd);
    var members =database.collection("Members");
    members.updateMany({"userId":userId},{$set:{"userPwd":userPwd}}, function(err,result1){
        if(err){
            callback(err,null);
            return;
        }
        if(result1.modifiedCount>0){ 
            console.log("사용자 레코드 추가됨"+result1.modifiedCount);
        }else{
            console.log("추가되지 않았음");
        }
        callback(null,result1);
    });
}

//////////////// 라우팅 함수 등록////////////////////////////////////
var router = express.Router();
router.route('/process/login').post(function(req,res){
    console.log('/process/login 호출됨')
    var userId =req.body.userId || req.query.userId;
    var userPwd =req.body.userPwd || req.query.userPwd;
    console.log("요청 파라메터 : "+userId+","+userPwd);;
    if(database){
        authMember(database,userId,userPwd,function(err,docs){
            if(err){throw err;}
            if(docs){
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>로그인 성공</h1>');res.end();
            }else{
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>로그인 실패</h1>');res.end();
            }
        })
    }else{
        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
        res.write('<h1>데이터 베이스 연결 실패</h1>');res.end();
    }
});

router.route('/process/addMember').post(function(req,res){
    console.log('/process/addMember 호출됨')
    var userId =req.body.userId || req.query.userId;
    var userPwd =req.body.userPwd || req.query.userPwd;
    console.log("요청 파라메터 : "+userId+","+userPwd);;
    if(database){
        addMember(database,userId,userPwd,function(err,result){
            if(err){throw err;}
            if(result){
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>회원가입 성공</h1>');res.end();
            }else{
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>회원가입 실패</h1>');res.end();
            }
        })
    }else{
        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
        res.write('<h1>데이터 베이스 연결 실패</h1>');res.end();
    }
});

router.route('/process/update').post(function(req,res){
    console.log('/process/update 호출됨')
    var userId =req.body.userId || req.query.userId;
    var userPwd =req.body.userPwd || req.query.userPwd;
    console.log("요청 파라메터 : "+userId+","+userPwd);;
    if(database){
        updateMember(database,userId,userPwd,function(err,result1){
            if(err){throw err;}
            if(result1){
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>정보수정 성공</h1>');res.end();
            }else{
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>정보수정 실패</h1>');res.end();
            }
        })
    }else{
        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
        res.write('<h1>데이터 베이스 연결 실패</h1>');res.end();
    }
});



app.use('/',router);
app.listen(app.get('port'),function(){
    console.log("서버가 시작되었습니다 포트" + app.get('port'));
    connectDB();
})
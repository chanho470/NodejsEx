let express = require("express"),path=require('path'),http =require('http');
let bodyParser = require('body-parser');
let cookieParser =require('cookie-parser');
let static =require("serve-static");
let errorHandler=require("errorhandler");
let expressErrorHandler =require('express-error-handler');
let expressSession =require("express-session");
let app = express();
let MongoClient =require('mongodb').MongoClient;

let mongoose =require('mongoose');

app.set('port',process.env.PORT||3000);
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/public',static(path.join(__dirname,'public')))
let database ; let MemberSchema; let MemberModel;
////////////////////////////////////////////////////////////////
function connectDB(){
    var databaseUrl ='mongodb://localhost:27017/bitDB';
    console.log("데이터 베이스 연결을 시도합니다.");
    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl);
    database = mongoose.connection;
    database.on("error",console.error.bind(console,'mongoose connection error.'));

    database.on('open',function(){
        console.log("데이터 베이스에 연결되었습니다. " + databaseUrl);
        // MemberSchema = mongoose.Schema({
        //     userId : String,
        //     userPwd : String,
        //     userName :String
        // });
        MemberSchema = mongoose.Schema({
            userId:{type:String ,require:true,unique:true},
            userPwd:{type:String ,require:true},
            userName:{type:String,index:'hashed'},
            age:{type:Number,"default":-1},
            regDate:{type:Date,index:{unique:false},'default':Date.now},
            updateDate:{type:Date,index:{unique:false},'default':Date.now}
        });
        MemberSchema.static('findById',function(userId,callback){
            return this.find({userId:userId},callback);
        });
        MemberSchema.static('findAll',function(callback){
            return this.find({},callback);
        });
        console.log("MemberSchema 정의함");
        MemberModel = mongoose.model("members2",MemberSchema);
        console.log("MemberModel 정의함");
    });
    database.on('disconnected',function(){
        console.log('연결이 끊어짐 5초후 재연결함');
        setInterval(connectDB,5000);
    });
}
///////////////////////////////////////////스키마//////////


//////////////////////////////////////////////////////////////
var addMember =function(database,userId,userPwd,userName,age,callback){
    console.log('addMember 호출됨 ' + userId +" , "+ userPwd+','+userName+','+age);
    var user = new MemberModel({"userId":userId,"userPwd":userPwd,"userName":userName,"age":age});
   user.save(function(err,addedUser){
    console.log("addedUser%j",addedUser);
    if(err){
        callback(err,null);
        return;
    }
    console.log("사용자데이터 추가함");
    callback(null,addedUser);
   });
};
////////////////////////////////////////////////////////////////
var authMember =function(database,userId,userPwd,userName,age,callback){
    console.log('authMember 호출됨 '  + userId +" , "+ userPwd+','+userName);
    MemberModel.findById(userId,function(err,results){
        if(err){
            callback(err,null);
            return;
        }
        console.log("아이디[%s] 패스워드[%s]가 사용자 검색결과.",userId,userPwd);
        if(results.length>0){ 
            if(results[0]._doc.userPwd === userPwd){
                console.log("비밀번호 일치함");
                callback(null,results);
            }else{
                console.log("비밀번호 일치하지 않움");
                callback(null,results);
            }
        }else{
            console.log("일치하는 사용자를 찾지못함");
            callback(null,null);
        }
    });
}

//////////////// 라우팅 함수 등록////////////////////////////////////
var router = express.Router();
//////////////////사용자 검색 로그인
router.route('/process/login').post(function(req,res){
    console.log('/process/login 호출됨')
    var userId =req.body.userId || req.query.userId;
    var userPwd =req.body.userPwd || req.query.userPwd;
    var userName =req.body.userName || req.query.userName;
    console.log("요청 파라메터 : "+userId+","+userPwd+","+userName);
    if(database){
        authMember(database,userId,userPwd,userName,function(err,docs){
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
//////////////////사용자 추가 회원가입 
router.route('/process/addMember').post(function(req,res){
    console.log('/process/addMember 호출됨')
    var userId =req.body.userId || req.query.userId;
    var userPwd =req.body.userPwd || req.query.userPwd;
    var userName =req.body.userName || req.query.userName;
    var age =req.body.age || req.query.age;
    console.log("요청 파라메터 : "+userId+","+userPwd+","+userName+","+age);
    if(database){
        addMember(database,userId,userPwd,userName,age,function(err,result){
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

router.route('/process/listMember').post(function(req,res){
    console.log('/process/listMember 호출됨')
    if(database){
        MemberModel.findAll(function(err,results){
            if(err){
                console.error('사용자 리스트 조회 중 오류 발생'+err.stack);
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 리스트 조회중 오류 발생</h2>');
                res.write('<p>'+err.stack+'</p>');
                res.end();
                return;
            }
            if(results){
                console.dir(results);
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 리스트</h2>');
                res.write('<div><ul>');
                for(var i=0;i<results.length;i++){
                    var curUserId =results[i]._doc.userId;
                    var curUserName =results[i]._doc.userName;
                    var curUserPwd =results[i]._doc.userPwd;
                    var curAge =results[i]._doc.age;
                    var curRegDate =results[i]._doc.regDate.toLocaleTimeString();
                    var curUpdateDate =results[i]._doc.updateDate.toLocaleTimeString();
                    res.write('<li>#'+i+':'+" 사용자 아이디 :"+curUserId+','+" 사용자 비밀번호 :"+curUserPwd+','+"  이름 : "+curUserName+','+"  나이 : "+curAge+',<br>'+curRegDate+','+curUpdateDate+'</li><br>')
                }
                res.write('</ul></div>');
                res.end();
            }else{

            }
        });
    }

});

app.use('/',router);
app.listen(app.get('port'),function(){
    console.log("서버가 시작되었습니다 포트" + app.get('port'));
    connectDB();
})
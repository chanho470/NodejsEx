


let express = require("express"),path=require('path'),http =require('http');
let bodyParser = require('body-parser');
let cookieParser =require('cookie-parser');
let static =require("serve-static");
let errorHandler=require("errorhandler");
let expressErrorHandler =require('express-error-handler');
let expressSession =require("express-session");
let app = express();
let MongoClient =require('mongodb').MongoClient;
var socketio =require('socket.io');
var cors = require('cors');
let mongoose =require('mongoose');
const { addMember } = require("./member");
let database ; let MemberSchema; let MemberModel;

app.set('port',process.env.PORT||3000);
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors());

app.use('/public',static(path.join(__dirname,'public')));
app.use('/semantic',static(path.join(__dirname,'semantic')));
app.use('/images',static(path.join(__dirname,'images')));
app.set('/views',__dirname+'/views');
app.set('view engine','ejs');

////////////////////////스키마 생성함수////////////////////////////////////////
function createMemberSchema(database){
    console.log("호출되었음");
    database.MemberSchema=require('./memberSchema').createSchema(mongoose);
    database.MemberModel=mongoose.model("members2",database.MemberSchema);
    console.log("스키마 생성되었음");
    console.dir("모델 생성되었음");
}
///////////////////////////데이터베이스 연결함수///////////////////////////
function connectDB(){
    var databaseUrl ='mongodb://localhost:27017/bitDB';
    console.log("데이터 베이스 연결을 시도합니다.");
    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl);
    database = mongoose.connection;
    database.on("error",console.error.bind(console,'mongoose connection error.'));

    database.on('open',function(){
        console.log("데이터 베이스에 연결되었습니다. " + databaseUrl);
        createMemberSchema(database);
    });
    database.on('disconnected',function(){
        console.log('연결이 끊어짐 5초후 재연결함');
        setInterval(connectDB,5000);
    });
    app.set('database',database);
}

var router = express.Router();
var member =require('./member');

const res = require("express/lib/response");
router.route('/process/login').post(member.procLogin);
router.route('/process/addMember').post(member.procAddMember);
router.route('/process/listMember').post(member.procListMember);
router.route('/process/update').post(member.procUpdate);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var server = app.listen(app.get('port'),function(){ //시작된 서버 객체를 반환
    console.log('서버가 시작됨 포트 :' +app.get('port'));
    connectDB();
});
// 소켓 아이오 서버를 시작
 var io = socketio(server);
console.log('socket.io 요청 대기중')


var login_userIds ={};
//클라이언트가 연결했을때의 이벤트 처리
io.sockets.on('connection',function(socket){
    console.log('connection info :',socket.request.connection._peername);
    socket.remoteAddress=socket.request.connection._peername.address;
    socket.remotePort=socket.request.connection._peername.port;
    // message 이벤트를 받았을때의 처리
    socket.on('message',function(message){
        //나를 포함한 모든 클라이언트에게 메세지 전달
        console.log('message 이벤트를 받았음');
        console.dir(message);
        if(message.recepient == "ALL"){
            console.dir("나 포함 모든 클라이언트에게 메세지 이벤트를 전송");
            io.sockets.emit('message',message);
        }else{
            if(login_userIds[message.recepient]){
                io.sockets.to(login_userIds[message.recepient]).emit('message',message);
                sendResponse(socket,'message','200','메세지를 전송완료')
            }else{
                sendResponse(socket,'login','404','상대방의 로그인 아이디를 찾을수 없음')
            }
        }
    });

    socket.on('login',function(login){
        console.log('login 이벤트 발생');
        console.dir(login);
        login_userIds[login.userId] =socket.id;
        socket.login_userId = login.userId;
        console.log("접속한 클라이언트 이이디 개수 %d ",Object.keys(login_userIds).length);
        sendResponse(socket,'login','200','로그인 되었음');
    });
    function sendResponse(socket,command,code,message){
        var statusObj = {command : command ,code:code,message:message};
        socket.emit('response',statusObj);
    }
});

// app.use('/',router);
// app.listen(app.get('port'),function(){
//     console.log("서버가 시작되었습니다 포트" + app.get('port'));
//     connectDB();
// })
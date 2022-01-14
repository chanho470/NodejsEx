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
const { addMember } = require("./member");

app.set('port',process.env.PORT||3000);
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/public',static(path.join(__dirname,'public')));
app.use('/semantic',static(path.join(__dirname,'semantic')));
app.use('/images',static(path.join(__dirname,'images')));
app.set('/views',__dirname+'/views');
app.set('view engine','ejs');



let database ; let MemberSchema; let MemberModel;

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

app.use('/',router);
app.listen(app.get('port'),function(){
    console.log("서버가 시작되었습니다 포트" + app.get('port'));
    connectDB();
})
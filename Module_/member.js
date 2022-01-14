
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

var updateMember =function(database,userId,userPwd,callback){
    console.log('updateMember 호출됨 ' + userId +" , "+ userPwd);
    //var members =database.collection("members2");
    database.MemberModel.updateMany({"userId":userId},{$set:{"userPwd":userPwd}}, function(err,result1){
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

var authMember =function(database,userId,userPwd,userName,callback){
    console.log('authMember 호출됨 '  + userId +" , "+ userPwd+','+userName);
    database.MemberModel.findById(userId,function(err,results){
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
                callback(null,null);
            }
        }else{
            console.log("일치하는 사용자를 찾지못함");
            callback(null,null);
        }
    });
}

var listMember = function(database, callback){
    console.log("listMember 호출됨");
    database.MemberModel.findAll(function(err,results){
        console.log("findAll 호출됨");
        if(err){
            callback(err,null);
            return;
        }
        if(results.length>0){
            console.log("등록된 회원목록 결과" + results);
            callback(null,results);
        }
        else{
            console.log('등록된 회원 없음');
            callback(null,null);
        }
    })
}
/////////////////////////라우터///////////////////////////////////////

var procLogin = function(req,res){
    console.log("모듈내에 있는 로그인 프로스 호출됨");
    var database =req.app.get('database');
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
                var context ={userId:userId,userPwd:userPwd}
                req.app.render('loginSuccess',context,function(err,html){
                    if(err){
                        console.error('뷰 랜더링중 오류 발생 :'+err.stack);
                        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                        res.write('<h1>뷰 랜더링중 오류 발생</h1>');
                        res.write('<p>'+err.stack+'</p>');
                        res.end();
                        return;
                    }
                    console.log('rendered :'+html);
                    res.end(html);
                });
            }else{
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>로그인 실패</h1>');res.end();
            }
        })
    }else{
        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
        res.write('<h1>데이터 베이스 연결 실패</h1>');res.end();
    }

}

var procUpdate = function(req,res){
    console.log('/process/update 호출됨');
    var database =req.app.get('database');
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

}

var procAddMember = function(req,res){
    console.log("모듈내에 있는 add 프로스 호출됨");
    var database =req.app.get('database');
    
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
                var context ={userId:userId,userPwd:userPwd,userName:userName,age:age}
                req.app.render('addMember',context,function(err,html){
                    if(err){
                        console.error('뷰 랜더링중 오류 발생 :'+err.stack);
                        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                        res.write('<h1>뷰 랜더링중 오류 발생</h1>');
                        res.write('<p>'+err.stack+'</p>');
                        res.end();
                        return;
                    }
                    console.log('rendered :' +html);
                    res.end(html);
                });
                // res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                // res.write('<h1>회원가입 성공</h1>');res.end();
            }else{
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>회원가입 실패</h1>');res.end();
            }
        })
    }else{
        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
        res.write('<h1>데이터 베이스 연결 실패</h1>');res.end();
    }

}

var procListMember = function(req,res){
    console.log("모듈내에 있는 list 프로스 호출됨");
    var database =req.app.get('database');
    console.log('/process/listMember 호출됨')
    if(database){
        listMember(database,function(err,results){
            if(err){
                console.error('사용자 리스트 조회 중 오류 발생'+err.stack);
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 리스트 조회중 오류 발생</h2>');
                res.write('<p>'+err.stack+'</p>');
                res.end();
                return;
            }
            if(results){
                var context ={results:results};
                req.app.render('listMember',context,function(err,html){
                    if(err){
                        console.error('뷰 랜더링중 오류 발생 :'+err.stack);
                        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                        res.write('<h1>뷰 랜더링중 오류 발생</h1>');
                        res.write('<p>'+err.stack+'</p>');
                        res.end();
                        return;
                    }
                    console.log('rendered :' +html);
                    res.end(html);
                });
            //     console.dir(results);//
            //     res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
            //     res.write('<h2>사용자 리스트</h2>');
            //     res.write('<div><ul>');
            //     for(var i=0;i<results.length;i++){
            //         var curUserId =results[i]._doc.userId;
            //         var curUserName =results[i]._doc.userName;
            //         var curUserPwd =results[i]._doc.userPwd;
            //         var curAge =results[i]._doc.age;
            //         var curRegDate =results[i]._doc.regDate.toLocaleTimeString();
            //         var curUpdateDate =results[i]._doc.updateDate.toLocaleTimeString();
            //         res.write('<li>#'+i+':'+" 사용자 아이디 :"+curUserId+','+" 사용자 비밀번호 :"+curUserPwd+','+"  이름 : "+curUserName+','+"  나이 : "+curAge+',<br>'+curRegDate+','+curUpdateDate+'</li><br>')
            //     }
            //     res.write('</ul></div>');
            //     res.end();
            // }else{

            }
        });
    }
}

module.exports.procLogin =procLogin;
module.exports.procAddMember =procAddMember;
module.exports.procListMember =procListMember;
module.exports.procUpdate =procUpdate;

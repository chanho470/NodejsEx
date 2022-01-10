//Promise의 catch 사용

/*const flag=true;
const flag=false;
const promise =new Promise((resolve,reject)=>{
    if(flag === true){
        resolve("오렌지");
    }
    else{
        reject("사과");
    }
});
promise.then((value)=>{
    console.log(value);//resolve("오렌지");
});
promise.catch((value)=>{
    console.log(value);//reject("사과");
});*/
//false 일떄 오류 발생한다
/////////////////////////////////////////////////////////
const flag=false;
const promise =new Promise((resolve,reject)=>{
    if(flag === true){
        resolve("오렌지");
    }
    else{
        reject("사과");
    }
}).then((value)=>{
    console.log(value);//resolve("오렌지");
}).catch((value)=>{
    console.log(value);//reject("사과");
});
//오류 없이 flage 가 false 일때 사과가 출력된다
function workP(sec){
    //Promise 인스턴스 반환하고 then 에서는 콜백함수 호출
    return new Promise((resolve,reject) =>{ //객체 생성
        //Promise 생성시 넘기는 callback
        //resolve 동작 완료사 호출 
        //reject 오류 발생시
        setTimeout(()=>{//1초후에 날 객체 생성
            resolve(new Date().toISOString());
        },sec * 1000);
    });
}

workP(1).then((result)=>{
    console.log("first" ,result);
    return workP(1);
}).then((result)=>{
    console.log("second" ,result);
});
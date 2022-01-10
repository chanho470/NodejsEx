//거의 동시에 종료 되었음

function work(sec,callback){
    setTimeout(()=>{
        callback(new Date().toISOString());
    },sec*1000);
};
work(1,(result)=>{
    console.log("first" ,result);
});
work(1,(result)=>{
    console.log("second" ,result);
});
work(1,(result)=>{
    console.log("third" ,result);
    console.log("======================================")
});
//////////////////////////////////////////////////////

work(1,(result)=>{
    console.log("first" ,result);
    work(1,(result)=>{
        console.log("second" ,result);
        work(1,(result)=>{
            console.log("third" ,result);
        });
    });
});


work(1,(result)=>{
    console.log("first" ,result);
    work(1,(result)=>{
        work(1,(result)=>{
            console.log("third" ,result);
        });
        console.log("second" ,result);
    });
});
// 둘다 같은 실행 결과 큐 , 스택
//순서대로 실행되었음 first -> second -> third

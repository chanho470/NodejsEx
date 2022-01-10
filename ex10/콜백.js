//콜백함수 a(callback){명령들} 명령들 모두 실행하고 callback 실행
//비동기적 실행
//todo : second
//todo : first

setTimeout(()=>{
    console.log("todo : first")
},3000);

setTimeout(()=>{
    console.log("todo : second")
},2000);



//동기처리
//todo : first
//todo : second
setTimeout(()=>{
    setTimeout(()=>{ // 콜백함수 
        console.log("todo : second") //콜백
    },2000); //콜백
    console.log("todo : first") //할일
},3000);
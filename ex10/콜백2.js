//동기적 처리 됨 
// 콜스택 실행하고 빠짐 실해하고 빠짐 실행하고 빠짐
/*
function mySetTimeout(callback){
    callback();
}
console.log(0);
mySetTimeout(function(){
    console.log("hello");
});
console.log(1);
*/
//0
//hello
//1

//API의 비동기 처리

console.log(0); // 1처리 
setTimeout(function(){ //2 콜 큐에 삽입 // 4 처리
    console.log("hello");
},0);
console.log(1); //3 처리 

// 0
// 1
// hello
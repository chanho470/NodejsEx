//내부 함수가 외부함수의 스코프에 접근할 수 있음
function outer(){
    var a ="AA";
    var b ="BB";
    function inner(){
        var a='aa';
        console.log('from inner :' +a); //aa
        console.log('from inner :' +b); //BB
    }
    return inner;
}
var outerFunc = outer();
outerFunc();
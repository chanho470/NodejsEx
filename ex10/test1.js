console.log("2222222222222222222222222");
console.log('숫자 보여주기 : %d  ',10);
console.log('문자열 보여주기 : %s  ','문자!');
console.log('JSON 객체 보여주기 : %j  ',{name:'코난'});

var result = 0;
console.time('elaosed time'); //시작
for(var i=1;i<=100;i++){
    result +=i;
}
console.timeEnd('elaosed time'); //끝 ~ 차이 시간 계산
console.log("1부터 100까지의 합 ",result);

console.log('현재 실행한 파일의 이름 : %s', __filename);
console.log('현재 실행한 파일의 경로 : %s', __dirname);
var Person = {name : "conan" ,age:"100"};
console.dir(Person);

//Es6 이후에는 var 대신 const let 사용 변수 호이스팅
console.log(dog); // undefined
var dog = 'vark1' ;
console.log(dog);
var dog = 'vark2' ;
console.log(dog);

// 호이스팅 해결 //변수의 중복선언 불가
//let dog1; 
//dog1='happy';
//console.log(dog1);
//let dog ='happy';
//const dog2='happy'; 
//const dog2='very happy';
//console.log(dog2);

//let 재할당 가능 
//const 재할당 불가 

let dog3 = 'happy';
{
    let dog3 = 'sad';
}
console.log(dog3)
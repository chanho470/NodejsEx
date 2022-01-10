//콘솔 창에서 확인 객체의 원형인 프로토 타입을 이용하여 새로운 객체를 만들어내고 생성된 객ㅇ체는 다른 객체의 원형이 되어 
// 새로운 객체를 생성할 수 있음. 뭔소린지.....
function person(){};
console.log(person.prototype);


person.prototype.name ='conan';
console.log(person.prototype);
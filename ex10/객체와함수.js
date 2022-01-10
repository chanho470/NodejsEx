const car ={
    name : "beetle",
    speed :100,
    color : 'yellow',
    start: function(){
        return this.speed +10;
    }
}

console.dir(car);

// 함수 및 함수의 선언

function add(a,b){
    return a+b;
}
console.log("함수 : "+add(1,4));

const lamda_add = (a,b) =>{
    return a+b;
}
console.log("lamda_add : "+lamda_add(2,4));

// 함수 및 함수의 선언2

const myFunc = function(){
    console.log(arguments);
}
myFunc(1,2,3,4);
//[Arguments] { '0': 1, '1': 2, '2': 3, '3': 4 }
const myFunc1 = (...args)=>{
    console.log(args);
}
myFunc1(1,2,3,4);
//[ 1, 2, 3, 4 ]
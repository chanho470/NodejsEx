var Calc =require('./calc3');
var calc = new Calc();
calc.emit('stop');
console.log(Calc.title + " 에 스텁 이벤트를 전달함")
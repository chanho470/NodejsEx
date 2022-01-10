console.log("args 속성의 파라미터의 수" + process.argv.length);
console.dir(process.argv);
process.argv.forEach(function(item,index) {
    console.log(index +":"+item);
});
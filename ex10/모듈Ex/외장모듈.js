const nconf =require('nconf');
nconf.env();
console.log('os환경변수 값 %s' , nconf.get('OS'));


//npm install nconf


var member1 =require('./member1');
var member2 =require('./member2');
var member3 =require('./member3');
var member4 =require('./member4');
const Member = require('./member7');

// function showMember(){
//     return member1.getMember().userName +','+ member1.group.userName;
// }
// console.log("사용자 정보 : %s",showMember());

// function showMember2(){
//     return member2.getMember().userName +','+ member2.group.userName;
// }
// console.log("사용자 정보 : %s",showMember2());

// function showMember3(){
//     return member3.getMember().userName +','+ member3.group.userName;
// }
// console.log("사용자 정보 : %s",showMember3());

// function showMember(){
//     return member4().userName +','+ 'no group';
// }
// console.log("사용자 정보 : %s",showMember());

// var printMember =require('./member5').printMember;
// printMember();

// var member6 =require('./member6');
// member6.printMember();

var Member7 =require('./member7');
var member7 =new Member7('conan','코난');
member7.printMember();
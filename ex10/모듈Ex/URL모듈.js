
var url = require('url')
var curURL = url.parse("https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8");
var curStr = url.format(curURL);
console.log("주소 문자열 %s".curStr);
console.dir(curURL);
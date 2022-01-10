
var querystring = require('querystring');

var url = require('url')
var curURL = url.parse("https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8");

var param = querystring.parse(curURL.query);
console.log("요청 쿼리 중 파라미터 값 %s :", param.query);
console.log("원본 요청 파라메터 %s" ,querystring.stringify(param));
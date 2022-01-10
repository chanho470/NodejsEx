var fs = require('fs')
var infile = fs.createReadStream("./output.txt",{flags:'r'});
var outfile = fs.createWriteStream("./output2.txt",{flags:'w'});
infile.on('data',function(data){
    console.log("읽어드린 데이터",data);
    outfile.write(data);
})
infile.on('end',function(data){
    console.log("파일 읽기 종료");
    outfile.on('end',function(data){
        console.log("파일 쓰기 종료");
       
    });
});
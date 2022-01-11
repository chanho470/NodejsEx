const express =require('express');
var app =express();

app.set('port',process.env.PORT || 3000);
app.get('/',(req,res)=>{
    res.send("Hello world");
});

app.listen(app.get('port'), () =>
    console.log('익스프레스 서버를 시작했씁니다 : ' + app.get('port'))
);
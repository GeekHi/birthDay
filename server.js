var express = require("express");

var app=express();

// 使用express创建静态服务器
app.use('/',express.static("./public"));

app.listen(8081,function afterListen(){
    console.log("express running on http://localhost:8081");
});
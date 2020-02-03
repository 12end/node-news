const init = require("./src/init");
const router = require("./src/router");
const express = require("express");

Object.prototype.list = [];
//使用封装的readData函数读取
init();

app = express();
app.set('view engine','html');
app.engine('html', require('ejs').renderFile);

app.use(router);

app.listen(8080,function () {
    console.log("Server run on port 8080");
});

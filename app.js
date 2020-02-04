const router = require("./src/router");
const express = require("express");
const config = require("./src/config");
const bodyparser = require('body-parser');



app = express();
app.set('view engine','html');
app.engine('html', require('ejs').renderFile);//使用ejs引擎渲染html文件
app.use(bodyparser.urlencoded({extended:true}));//使用bodyparser中间件以访问req.body

app.use(router);

app.listen(config.port,function () {
    console.log("Server run on port 8080");
});

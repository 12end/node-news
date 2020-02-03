const http = require('http');

const init = require("./src/init");
const router = require("./src/router");
const extend = require("./src/extend");

Object.prototype.list = [];
//使用封装的readData函数读取
init();

http.createServer((req, res) => {
    extend(req,res);
    router(req,res);
}).listen(9090, () => {
    console.log("Server run on port 9090")
});

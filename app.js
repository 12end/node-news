const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const queryString = require('querystring');
const _ = require('underscore');

var list = [];
//使用封装的readData函数读取
readData("data.json", (data) => {
    if (data) {
        list = JSON.parse(data);
    } else {
        list = JSON.parse("[]");
    }
});

// fs.readFile(path.join(__dirname, "/data/data.json"), "utf-8", ((err, data) => {
//     if (err) {
//         console.log(err.stack);
//     } else {
//         list = JSON.parse(data || "[]");
//     }
// }));

http.createServer((req, res) => {
    res.render = function (fileName, tplData = null) {
        fs.readFile(fileName, (err, data) => {
            if (err) {
                console.log(err.stack);
                res.render(path.join(__dirname, '/404.html'));
            } else {
                let fileMime = mime.getType(fileName);
                if (fileName.endsWith("404.html")) {
                    res.writeHead(404, 'Not Found', {'Content-Type': fileMime});
                } else {
                    res.writeHead(200, 'OK', {'Content-Type': fileMime});
                }

                if (tplData) {
                    data = _.template(data.toString('utf-8'))(tplData);
                }
                res.end(data, 'utf-8');
            }
        })
    };
    // req.on('data', (chunk) => {
    //     data.push(chunk);
    // });

    req.url = req.url.toLowerCase();
    req.method = req.method.toLowerCase();

    if (req.url === '/' || req.url === '/index' && req.method === 'get') {
        res.render(path.join(__dirname, "Index.html"), {"list": list});
    } else if (req.url === '/submit' && req.method === 'get') {
        console.log(url.parse(req.url, true).query);
        res.render(path.join(__dirname, "Submit.html"));
    } else if (req.url.startsWith('/item') && req.method === 'get') {
        id = url.parse(req.url, true).query.id;
        if (isNaN(id)) {
            res.end("Id must be a number!");
        }
        if (!list[id]) {
            res.render(path.join(__dirname, "404.html"));
        }
        res.render(path.join(__dirname, "Item.html"), {news: list[id]});
    } else if (req.url.startsWith("/resources/")) {
        res.render(path.join(__dirname, req.url));
    } else if (req.url === ('/add') && req.method === 'post') {
        getMessage(req, (data) => {
            let incomingObj = queryString.parse(data);
            if (incomingObj.title && incomingObj.content) {
                let news = {};
                news.title = incomingObj.title;
                news.content = incomingObj.content;
                list.push(news);
                writeData("data.json", JSON.stringify(list), (err) => {
                    if (err) {
                        res.end("Add News fail" + err.stack);
                    } else {
                        res.writeHead(302, {"Location": "/"});
                        res.end();
                    }
                })
            } else {
                res.end("Title and content must not null!");
            }
        });

    } else {
        res.render(path.join(__dirname, "404.html"));
    }
}).listen(9090, () => {
    console.log("Server run on port 9090")
});

function writeData(filename, data, callback) {
    fs.writeFile(path.join(__dirname, "/data/", filename), data, (err) => {
        callback(err);
    });
}

function readData(filename, callback) {
    fs.readFile(path.join(__dirname, "/data/", filename), "utf-8", ((err, data) => {
        if (err) {
            console.log(err.stack);
            callback();
        } else {
            callback(data);
        }
    }))
}

function getMessage(req, callback) {
    let data = [];
    req.on('data', (chunk) => {
        data.push(chunk);
    });
    req.on('end', () => {
        data = Buffer.concat(data).toString('utf-8');
        callback(data);
    })
}

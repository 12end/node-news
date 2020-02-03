const path = require('path');
const fs = require('fs');
const queryString = require('querystring');


module.exports.index = function (req,res) {
    res.render(path.join(__dirname, "/views/Index.html"), {"list": list});
};
module.exports.submit = function (req,res) {
    res.render(path.join(__dirname, "/views/Submit.html"));
};
module.exports.item = function (req,res) {
    let id = req.queryObj.id;
    if (isNaN(id)) {
        res.end("Id must be a number!");
    }
    if (!list[id]) {
        res.render(path.join(__dirname, "/views/404.html"));
    }
    res.render(path.join(__dirname, "/views/Item.html"), {news: list[id]});
};
module.exports.static = function (req,res) {
    res.render(path.join(__dirname, req.url));
};
module.exports.add = function (req,res) {
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
};
module.exports.error = function (req,res) {
    res.render(path.join(__dirname, "/views/404.html"));
};

function writeData(filename, data, callback) {
    fs.writeFile(path.join(__dirname, "/data/", filename), data, (err) => {
        callback(err);
    });
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
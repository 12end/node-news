const path = require('path');
const fs = require('fs');


module.exports.index = function (req,res) {
    res.render(("Index"), {"list": list});
};
module.exports.submit = function (req,res) {
    res.render("Submit");
};
module.exports.item = function (req,res) {
    let id = parseInt(req.params.id);
    if (!list[id]) {
        res.render("404");
    }
    res.render("Item", {news: list[id]});
};

module.exports.add = function (req,res) {
    let incomingObj = req.body;
    if (incomingObj.title && incomingObj.content) {
        let news = {};
        news.title = incomingObj.title;
        news.content = incomingObj.content;
        list.push(news);
        writeData("data.json", JSON.stringify(list), (err) => {
            if (err) {
                res.send("Add News fail" + err.stack);
            } else {
                res.redirect("/");
            }
        })
    } else {
        res.send("Title and content must not null!");
    }
};
module.exports.error = function (req,res) {
    res.render("404");
};

function writeData(filename, data, callback) {
    fs.writeFile(path.join(__dirname, "../data/", filename), data, (err) => {
        callback(err);
    });
}
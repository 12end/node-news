const database = require("./database");


module.exports.index = function (req,res) {
    database.fetchnews({start:0,num:10},(err,data)=>{
        if(err){
            res.render("404",{message:err.toString()});
        }else{
            res.render("Index",{list: data});
        }
    });
};
module.exports.submit = function (req,res) {
    res.render("Submit");
};
module.exports.item = function (req,res) {
    let id = req.params.id;
    database.fetchnews({id:id},(err,data)=>{
        if(err){
            res.render("404",{message:err.toString()});//将404模板化
        }else{
            res.render("Item",{news: data[0]});
        }
    })
};

module.exports.add = function (req,res) {
    let incomingObj = req.body;
    if (incomingObj.title && incomingObj.content) {
        let news = {};
        news.title = incomingObj.title;
        news.content = incomingObj.content;
        database.add(news,(err)=>{
            if(err){
                res.send(err.stack);
            }else{
                res.redirect("/");
            }
        });

    } else {
        res.send("Title and content must not null!");
    }
};
module.exports.error = function (req,res) {
    res.render("404");
};

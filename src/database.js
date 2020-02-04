const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;//mongodb的二进制id需要转换
const config = require("./config");


module.exports.add = (news,callback)=>{
    MongoClient.connect(config.dburl, (err, client) => {
        client.db(config.dbname).collection('news').insertOne(news).then((res)=>{
            callback(null,res);
        },(err)=>{
            callback(err);
        })
    })
};
//定义options参数根据情况实现查询单条或多条记录
module.exports.fetchnews = (options,callback)=>{
    let {start,num,id} = options;
    if (id){
        MongoClient.connect(config.dburl, (err, client) => {
            client.db(config.dbname).collection('news').find({_id:ObjectID.createFromHexString(id)}).toArray().then((res) => {
                callback(null,res);
            }, (err) => {
                callback(err);
            })
        });
    }else {
        MongoClient.connect(config.dburl, (err, client) => {
            client.db(config.dbname).collection('news').find().skip(start).limit(num).toArray().then((res) => {
                callback(null,res);
            }, (err) => {
                callback(err);
            })
        });
    }
};
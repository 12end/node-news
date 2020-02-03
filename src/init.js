const fs = require('fs');
const path = require('path');
module.exports=function () {
    readData("data.json", (data) => {
        if (data) {
            list = JSON.parse(data);
        } else {
            list = JSON.parse("[]");
        }
    });
};
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
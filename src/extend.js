const url = require('url');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const _ = require('underscore');

module.exports=function (req,res) {

    let urlObj = url.parse(req.url.toLowerCase(),true);
    req.queryObj = urlObj.query;
    req.pathname = urlObj.pathname;

    req.method = req.method.toLowerCase();


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
};


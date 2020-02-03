const handler = require('./handler');

module.exports = function (req,res) {

    if (req.pathname === '/' || req.pathname === '/index' && req.method === 'get') {
        handler.index(req,res,list);
    } else if (req.pathname === '/submit' && req.method === 'get') {
        handler.submit(req,res);
    } else if (req.pathname.startsWith('/item') && req.method === 'get') {
        handler.item(req,res);
    } else if (req.pathname.startsWith("/resources/")) {
        handler.static(req,res);
    } else if (req.pathname === ('/add') && req.method === 'post') {
        handler.add(req,res);
    } else {
        handler.error(req,res);
    }
};


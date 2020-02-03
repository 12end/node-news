

res.pathname = 

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
var connect = require('connect');
var serveStatic = require('serve-static');

var log = function(req, res, next) {
  console.log(req.originalUrl)
  next();
}

connect()
.use(log)
.use(serveStatic(__dirname))

.listen(8080);
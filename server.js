var restify = require('restify');
var time = require('./time');
var port = process.env.PORT || 8080;

var server = restify.createServer();
server.pre(restify.pre.sanitizePath());
server.use(function(req, res, next) {
    console.log(req.method + ' ' + req.url);
    return next();
});
server.use(restify.bodyParser());

server.post('/time/set/:id/:UTCtime', time.post);
server.post('/time/set/:id', time.post);
server.get('/time/get/:id/:time_zone', time.getByID);
server.get('/time/get/:id/:time_zone1/:time_zone2', time.getByID);
server.del('/time/delete/:id', time.del);

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});

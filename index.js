var connect = require('connect');
var jade = require("./lib/processor/jade");
var less = require("./lib/processor/less");
var path = require("path");
var serveStatic = require("serve-static");
var mini_harp = function(root) {
	var app = connect(root);

	// serve index.html if url equals http://localhost:4000
	app.use(function(req, res, next) {
		if(req.url == "/") {
			req.url = "/index.html";
		}
		next();
	});

	// serve 404 if request for .jade or .less
	app.use(function(req, res, next) {
		if(path.extname(req.url) == ".jade" || path.extname(req.url) == ".less") {
			res.statusCode = 404;
		}
		next();
	});

	app.use(serveStatic(root));
	app.use(jade(root));
	app.use(less(root));

	return app;
}

module.exports = mini_harp;
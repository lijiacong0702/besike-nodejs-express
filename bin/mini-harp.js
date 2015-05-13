#!/usr/bin/env node
var createMiniHarp = require('mini-harp');
var rootPath = process.argv[2] || process.cwd();
var jade = require("../lib/processor/jade");
var less = require("../lib/processor/less");
var app = createMiniHarp(rootPath);

var args = require("minimist")(process.argv.slice(2));
var port = args.port || 4000;
console.log("Starting mini-harp on http://loaclhost:" + port);

// add a middleware
app.use(function(request, response, next) {
	if(request.url == "/current-time") {
		response.end((new Date()).toISOString());
	}
	next();
});

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

// serve the static file
var serveStatic = require("serve-static");
app.use(serveStatic(rootPath));
app.use(jade(rootPath));
app.use(less(rootPath));



app.listen(port);
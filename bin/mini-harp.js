#!/usr/bin/env node
var createMiniHarp = require('mini-harp');
var rootPath = process.argv[2] || process.cwd();
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

// serve the static file
var serveStatic = require("serve-static");
console.log(rootPath);
app.use(serveStatic(rootPath));

app.listen(port);
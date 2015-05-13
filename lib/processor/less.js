var less = require('less');
var path = require('path');
var fs = require('fs');

var makeLess = function(root) {
	return function(req, res, next) {
		if(path.extname(req.url) == '.css') {
			fs.readFile(root+'/'+path.basename(req.url, '.css')+'.less', {encoding:"utf8"}, function(err, data){
				if(err) {
					next();
				} else {
					less.render(data, function(e, output) {
						if(e) {
							next();
						} else {
							res.setHeader('Content-Length', 25);
							res.setHeader('Content-Type', "text/css; charset=UTF-8");
							res.end(output);
						}
					});
				}
			})
		} else {
			next();
		}
	}
}

module.exports = makeLess;
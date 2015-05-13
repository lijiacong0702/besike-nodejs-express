var jade = require('jade');
var path = require('path');
var fs = require('fs');

var makeJade = function(root) {
	return function(req, res, next) {
		if(path.extname(req.url) == '.html') {
			//console.log(root+'/'+path.basename(req.url, '.html')+'.jade');
			fs.readFile(root+'/'+path.basename(req.url, '.html')+'.jade', {encoding:"utf8"}, function(err, data){
				//console.log(err + data);
				if(err) {
					next();
				} else {
					var result = jade.render(data);
					res.setHeader('Content-Length', 26);
					res.setHeader('Content-Type', "text/html; charset=UTF-8");
					res.end(result);
				}
			})
		}else {
			next();
		}
	}
}

module.exports = makeJade;
var createMiniHarp = require('connect');

var mini_harp = function(root) {
	return createMiniHarp(root);
}

module.exports = mini_harp;
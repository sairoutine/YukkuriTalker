'use strict';

var m = require('mithril');

/*********************************************
 * m.request 拡張
 *********************************************/

// 上書き前の m.request
var request = m.request;

// m.request を上書き
m.request = function(args) {
	// ローディング画面
	var loaders = document.querySelectorAll(".loader");

	// サーバと通信中はローディング画面を表示
	for (var i = 0; i < loaders.length; i++) {
		loaders[i].style.display = "block";
	}

	return request(args)
	.then(function(value) {
		// 通信成功後はローディング画面を隠す
		for (var i = 0; i < loaders.length; i++) {
			loaders[i].style.display = "none";
		}
		return value;
	}, function(error) {
		// 通信失敗時はローディング画面を隠す
		for (var i = 0; i < loaders.length; i++) {
			loaders[i].style.display = "none";
		}

		throw error;
	});
};

module.exports = m;

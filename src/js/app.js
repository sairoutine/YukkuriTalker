'use strict';

var m = require('./mithril');

// TOPページ
var Top = require('./component/top.js');

m.route.mode = "hash";

//HTML要素にコンポーネントをマウント
m.route(document.getElementById("root"), "/", {
	"/": Top,
	"/about": Top,
	"/howto": Top,
});

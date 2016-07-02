'use strict';

var m = require('./mithril');

// TOPページ
var Top = require('./component/top.js');
// Yukkuri Talker とは
var About = require('./component/about.js');
// 使いかt
var Howto = require('./component/howto.js');



m.route.mode = "hash";

//HTML要素にコンポーネントをマウント
m.route(document.getElementById("root"), "/", {
	"/": Top,
	"/about": About,
	"/howto": Howto,
});

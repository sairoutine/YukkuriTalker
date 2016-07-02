'use strict';

var m = require('../mithril');

// navbar
var Navbar = require('./navbar');

module.exports = {
	controller: function() {
	},
	view: function(ctrl) {
		return <div>
			{/*navbar*/}
			<div>{ m.component(Navbar) }</div>

			{/*jumbotron*/}
			<div class="container" style="padding-top:30px">
				<div class="panel panel-default">
					<div class="panel-heading">
						使い方
					</div>
					<div class="panel-body">
						<img src="images/howto.png" />
						<h1>テキストを入力</h1>
						テキストを入力します。<br />
						<b>制限：テキストは255文字まで。漢字は今のところ読めません</b><br />
						<h1>再生</h1>
						再生ボタンを押すとブラウザ上でボイスを再生します<br />
						<h1>保存</h1>
						保存ボタンを押すとボイスをダウンロードすることができます。<br />
					</div>
				</div>
			</div>
		</div>;
	}
};

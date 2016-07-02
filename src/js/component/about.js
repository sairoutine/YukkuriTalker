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
						Yukkuri Talker とは？
					</div>
					<div class="panel-body">
						Web上でゆっくりボイスが作成できるサービスです。<br />
						テキストから合成音声を再生することができます。<br />
					</div>
				</div>

				<div class="panel panel-default">
					<div class="panel-heading">
						作成したゆっくりボイスの使用について
					</div>
					<div class="panel-body">
						ゆっくりボイスの作成には Aques Talk を使用させていただいております。<br />
						ボイスの使用に関しては Aques Talk のライセンスに準拠します。<br />
					</div>
				</div>

				<div class="panel panel-default">
					<div class="panel-heading">
						作った人
					</div>
					<div class="panel-body">
						Twitter: <a href="https://twitter.com/sairoutine">@sairoutine</a><br />
						サービスへのご希望やご意見、不具合などお待ちしております。<br />
					</div>
				</div>
			</div>
		</div>;
	}
};

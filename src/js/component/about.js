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
						本サービスは、(株)アクエストの音声合成ライブラリ<a href="http://www.a-quest.com/products/aquestalk.html">AquesTalk</a>を使用しており、<br />
						その著作権は同社に帰属します。営利目的での使用は当該ライブラリの使用ライセンスが必要となります。<br />
						<br />
						また、当サイトで使用しているゆっくり画像は<a href="http://www.nicotalk.com/charasozai_kt.html">きつねゆっくり素材</a>をお借りしております。<br />
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

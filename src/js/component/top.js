'use strict';

var api_url = '/convert/easy';


var m = require('../mithril');

// navbar
var Navbar = require('./navbar');

var Controller = function() {
		var self = this;

		// 入力中のテキスト
		self.text = m.prop('');

		// 再生中か否か
		self.is_playing = m.prop(false);

		// サウンド
		self.audio = new Audio();
};
Controller.prototype.onplay = function() {
	var self = this;
	return function(e) {
		e.preventDefault();
		if (self.is_playing()) return;

		var audio = self.audio;

		self.is_playing(true); // 再生中

		var url = self.get_url(self.text());

		var xhrConfig = function(xhr) {
			xhr.responseType = "arraybuffer";
		};

		var deserialize = function(value) {
			return value;
		};

		var extract = function (xhr, xhrOptions){
			return xhr.response;
		};

		function base64_From_ArrayBuffer(ary_buffer){
			var dic = [
				'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P',
				'Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f',
				'g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v',
				'w','x','y','z','0','1','2','3','4','5','6','7','8','9','+','/'
			];
			var base64 = "";
			var ary_u8 = new Uint8Array( ary_buffer );
			var num = ary_u8.length;
			var n = 0;
			var b = 0;

			var i = 0;
			while(i < num){
				b = ary_u8[i];
				base64 += dic[(b >> 2)];
				n = (b & 0x03) << 4;
				i ++;
				if(i >= num) break;

				b = ary_u8[i];
				base64 += dic[n | (b >> 4)];
				n = (b & 0x0f) << 2;
				i ++;
				if(i >= num) break;

				b = ary_u8[i];
				base64 += dic[n | (b >> 6)];
				base64 += dic[(b & 0x3f)];
				i ++;
			}

			var m = num % 3;
			if(m){
				base64 += dic[n];
			}
			if(m === 1){
				base64 += "==";
			}else if(m === 2){
				base64 += "=";
			}
			return base64;
		}



		return m.request({
			method: "GET",
			url: url,
			config: xhrConfig,
			extract: extract,
			deserialize: deserialize,
		})
		.then(function(res) {
			var audio = new Audio("data:audio/wav;base64," + base64_From_ArrayBuffer(res));
			audio.onended = function() {
				self.is_playing(false);
				m.redraw();
			};
			audio.play();
		}, function(err) {
			 console.log(err);
		});
	};
};
Controller.prototype.ondownload = function() {
	var self = this;
	return function(e) {
		e.preventDefault();
		console.log('ondownload');

	};
};
Controller.prototype.get_url = function(text) {
	return api_url + "?text=" + encodeURIComponent(text);
};

module.exports = {
	controller: Controller,
	view: function(ctrl) {
		return <div>
			{/*navbar*/}
			<div>{ m.component(Navbar) }</div>

			{/*jumbotron*/}
			<div class="container" style="padding-top:30px">
				<div class="jumbotron" style="background-color: rgba(255, 255, 255, 0.7);">
					<div class="container">
						<h1>Yukkuri Talker</h1>
						<p>
							Web上でゆっくりボイスが作成できるサービスです。<br />
						</p>
					</div>
				</div>

				<div class="row">
					<div class="col-md-9">
						<div class="input-group input-group-lg">
							<span class="input-group-addon" id="sizing-addon">
								<span class="glyphicon glyphicon-pencil"></span>
							</span>
							<input type="text" class="form-control" placeholder="ゆっくりボイスにするテキストを入力" data-toggle="tooltip" data-placement="top" title="ゆっくりボイスにするテキストを入力" aria-describedby="sizing-addon" value={ctrl.text()} onchange={m.withAttr('value', ctrl.text)} />
						</div>
					</div>

					<div class="col-md-3">
						<div class="btn-group btn-group-justified">
							<div class="btn-group">
								<button type="button" class="btn btn-success btn-lg" data-toggle="tooltip" data-placement="top" title="再生" onclick={ctrl.onplay()}>
									<span class={ ctrl.is_playing() ? "glyphicon glyphicon-pause" : "glyphicon glyphicon-play" }></span>&nbsp;再生
								</button>
							</div>
							<div class="btn-group">
								<a id="downloadAnchor" class="btn btn-warning btn-lg" data-toggle="tooltip" data-placement="top" title="保存" onclick={ctrl.ondownload()}>
									<span class="glyphicon glyphicon-download-alt"></span>&nbsp;保存
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>;
	}
};

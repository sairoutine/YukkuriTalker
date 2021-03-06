/* global $ */
'use strict';

var api_url = '/convert/easy';


var m = require('../mithril');

// navbar
var Navbar = require('./navbar');

var Controller = function() {
		var self = this;

		// 入力中のテキスト
		self.text = m.prop('');

		// サーバーと通信中か否か
		self.is_requesting = m.prop(false);
		// 再生中か否か
		self.is_playing = m.prop(false);

		// 最後に再生したテキスト
		self.last_text = m.prop('');
		// 最後に再生した音声データ(base64)
		self.last_voice_data = m.prop(null);

		self.error_message = m.prop("");
};
Controller.prototype.onplay = function() {
	var self = this;
	return function(e) {
		e.preventDefault();
		if (self.is_requesting() || self.is_playing()) return;

		if (self.text().length === 0 || self.text().length > 255) return self.error("テキストは1文字以上255文字以下で入力してください");

		self.is_playing(true); // 再生中
		m.redraw();

		// キャッシュがあるならばキャッシュを再生
		if(self.text() === self.last_text()) {
			return self.play_voice_by_binary(self.last_voice_data());
		}

		var url = self.get_url(self.text());

		self.is_requesting(true); // 通信中
		self.binary_request({
			method: "GET",
			url: url,
		})
		.then(function(binary) {
			// キャッシュする
			self.last_text(self.text());
			self.last_voice_data(binary);

			self.is_requesting(false); // 通信done

			// 再生
			return self.play_voice_by_binary(binary);
		}, function(err) {
			return self.error("音声データの生成に失敗しました");
		});
	};
};
Controller.prototype.ondownload = function() {
	var self = this;
	return function(e) {
		e.preventDefault();
		if (self.is_requesting()) return;

		if (self.text().length === 0 || self.text().length > 255) return self.error("テキストは1文字以上255文字以下で入力してください");

		// キャッシュがあるならばキャッシュをダウンロード
		if(self.text() === self.last_text()) {
			return self.download_voice_by_binary(self.last_voice_data());
		}

		var url = self.get_url(self.text());

		self.is_requesting(true); // 通信中
		self.binary_request({
			method: "GET",
			url: url,
		})
		.then(function(binary) {
			// キャッシュする
			self.last_text(self.text());
			self.last_voice_data(binary);

			self.is_requesting(false); // 通信done

			// ダウンロード
			return self.download_voice_by_binary(binary);
		}, function(err) {
			return self.error("音声データの生成に失敗しました");
		});
	};
};
Controller.prototype.download_voice_by_binary = function (binary) {
	var filename = "yukkuri.wav";
	var uint = new Uint8Array(binary);
	var blob = new Blob([uint], { "type" : "audio/wav" });

	if (window.navigator.msSaveBlob) {
		window.navigator.msSaveBlob(blob, filename);

		// msSaveOrOpenBlobの場合はファイルを保存せずに開ける
		window.navigator.msSaveOrOpenBlob(blob, filename);
	}
	else {
		// それ以外のブラウザ
		// Blobオブジェクトを指すURLオブジェクトを作る
		var objectURL = window.URL.createObjectURL(blob);

		// リンク（<a>要素）を生成し、JavaScriptからクリックする
		var link = document.createElement("a");
		document.body.appendChild(link);
		link.href = objectURL;
		link.download = filename;
		link.click();
		document.body.removeChild(link);
	}
};
Controller.prototype.get_url = function(text) {
	return api_url + "?text=" + encodeURIComponent(text);
};
Controller.prototype.binary_request = function(params) {
	var xhrConfig = function(xhr) {
		xhr.responseType = "arraybuffer";
	};

	var deserialize = function(value) {
		return value;
	};

	var extract = function (xhr, xhrOptions){
		return xhr.response;
	};

	return m.request({
		method: params.method,
		url: params.url,
		config: xhrConfig,
		deserialize: deserialize,
		extract: extract,
	});
};

Controller.prototype.play_voice_by_binary = function(binary) {
	var self = this;

	var voice_data = self.base64_From_ArrayBuffer(binary);

	var audio = new Audio("data:audio/wav;base64," + voice_data);
	audio.onended = function() {
		self.is_playing(false);
		m.redraw();
	};
	return audio.play();
};
Controller.prototype.base64_From_ArrayBuffer = function (ary_buffer) {
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
};
Controller.prototype.error = function(text) {
	var self = this;
	self.error_message(text);
	$('#ErrorModal').modal('show');
	self.is_requesting(false);
	self.is_playing(false);
};





module.exports = {
	controller: Controller,
	view: function(ctrl) {
		return <div>
			{/*navbar*/}
			<div>{ m.component(Navbar) }</div>

			<div class="container" style="padding-top:30px">
				<img src="reimu_168.png" class="pull-right visible-lg" />
				{/*jumbotron*/}
				<div class="jumbotron" style="background-color: rgba(255, 255, 255, 0.7);">
					<div class="container">
						<h1>Yukkuri Talker</h1>
						<p>
							Web上でゆっくりボイスが作成できるサービスです。<br />
						</p>
					</div>
				</div>

				{/* form */}
				<div class="row">
					<div class="col-md-9">
						<div class="input-group input-group-lg">
							<span class="input-group-addon" id="sizing-addon">
								<span class="glyphicon glyphicon-pencil"></span>
							</span>
							<input type="text" class="form-control" placeholder="ゆっくりボイスにするテキストをひらがなで入力" data-toggle="tooltip" data-placement="top" title="ゆっくりボイスにするテキストをひらがなで入力" aria-describedby="sizing-addon" value={ctrl.text()} onchange={m.withAttr('value', ctrl.text)} />
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

			{/* BEGIN: エラーモーダル */}
			<div id="ErrorModal" class="modal fade" role="dialog">
				<div class="modal-dialog">

					<div class="modal-content">
						<div class="modal-header">
							{/* 閉じるボタン */}
							<button type="button" class="close" data-dismiss="modal">&times;</button>
							<h4 class="modal-title">エラー</h4>
						</div>
						<div class="modal-body">
							{/* モーダル本文 */}
							{ ctrl.error_message() }
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-lg btn-danger" data-dismiss="modal">閉じる</button>
						</div>
					</div>
				</div>
			</div>
			{/* END: エラーモーダル */}
		</div>;
	}
};

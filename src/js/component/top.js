'use strict';

var api_url = '/convert/easy';


var m = require('../mithril');

// navbar
var Navbar = require('./navbar');

var Controller = function() {
		var self = this;

		// 入力中のテキスト
		self.text = m.prop('');
};
Controller.prototype.onplay = function() {
	var self = this;
	return function(e) {
		e.preventDefault();


		var audio = new Audio();
		audio.src = self.get_url(self.text());
		audio.play();
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
									<span class="glyphicon glyphicon-play"></span>&nbsp;再生
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

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
			<div class="container" style="padding-top:30px" id="root">
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
							<input type="text" class="form-control" placeholder="ゆっくりボイスにするテキストを入力" data-toggle="tooltip" data-placement="top" title="ゆっくりボイスにするテキストを入力" aria-describedby="sizing-addon" />
						</div>
					</div>

					<div class="col-md-3">
						<div class="btn-group btn-group-justified">
							<div class="btn-group">
								<button type="button" class="btn btn-success btn-lg" data-toggle="tooltip" data-placement="top" title="再生">
									<span class="glyphicon glyphicon-play"></span>&nbsp;再生
								</button>
							</div>
							<div class="btn-group">
								<a id="downloadAnchor" class="btn btn-warning btn-lg" data-toggle="tooltip" data-placement="top" title="保存">
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

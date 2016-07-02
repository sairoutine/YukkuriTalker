'use strict';
var m = require('../mithril');

module.exports = {
	controller: function() {},
	view: function(ctrl, args) {
		// 現在のURL
		var active_url = m.route();

		return <div>
			<nav class="navbar navbar-default">
				<div class="container-fluid">
					<div class="navbar-header">
						<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
							<span class="sr-only">Toggle navigation</span>
							<span class="icon-bar">&nbsp;</span>
							<span class="icon-bar">&nbsp;</span>
							<span class="icon-bar">&nbsp;</span>
						</button>
						<span class="navbar-brand">Yukkuri Talker</span>
					</div>
					<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul class="nav navbar-nav">
							<li class={ active_url === "/" ? "active" : "" }><a href="/" config={m.route}>ホーム</a></li>
							<li class={ active_url === "/about" ? "active" : "" }><a href="/about" config={m.route}>Yukkuri Talker とは？</a></li>
							<li class={ active_url === "/howto" ? "active" : "" }><a href="/howto" config={m.route}>使い方</a></li>
						</ul>
					</div>
				</div>
			</nav>
		</div>;
	}
};

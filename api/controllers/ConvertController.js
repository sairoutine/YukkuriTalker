'use strict';
var Uuid = require('node-uuid');
var fs = require('fs');
var exec = require('child_process').exec;

var command_path = "./cmd/";
var tmp_dir = "./tmp_files/";
module.exports = {
	easy: function (req, res) {
		var text = req.query.text; // ボイスに変換するテキスト

		var uuid = Uuid.v4();

		var speed = 100; // 再生スピード

		var input_filename = tmp_dir + uuid + ".txt";
		var output_filename = tmp_dir + uuid + ".wav";

		return fs.writeFile(input_filename, text, function (err) {
			if (err) return res.serverError(err);

			// AquesTalk コマンド
			var command = [
				'wine',
				command_path + 'AquesTalk.exe',
				input_filename,
				output_filename,
				speed,
			].join(' ');

			return exec(command, function (error, stdout, stderr) {
				if(stderr) return res.serverError(stderr);
				if (error !== null) return res.serverError(error);

				// wav を返す
				var stream = fs.createReadStream(output_filename);
				res.type('audio/wav');
				return stream.pipe(res);
			});
		});
	},
};

'use strict';
var Uuid = require('node-uuid');
var fs = require('fs');
var exec = require('child_process').exec;
var escape_kana = require('../util/escape_kana');

var command_path = "./cmd/";
var tmp_dir = "./tmp_files/";
module.exports = {
	easy: function (req, res) {
		var text = req.query.text; // ボイスに変換するテキスト

		text = escape_kana(text); // aquestalkの読めない文字を変換

		var uuid = Uuid.v4();

		var speed = 100; // 再生スピード

		var input_filename = tmp_dir + uuid + ".txt";
		var nkfed_filename = tmp_dir + uuid + "-sjis.txt";
		var output_filename = tmp_dir + uuid + ".wav";

		// ファイルに書き出し
		return fs.writeFile(input_filename, text + "\n", function (err) {
			if (err) {
				return res.serverError({
					text: text,
					uuid: uuid,
					err: err
				});
			}

			// nkf コマンド
			var command = [
				'nkf',
				'-s',
				input_filename,
				'>',
				nkfed_filename,
			].join(' ');

			// nkf で sjis に変換
			return exec(command, function (error, stdout, stderr) {
				if(stderr) {
					return res.serverError({
						text: text,
						uuid: uuid,
						err: stderr
					});
				}
				if (error !== null) {
					return res.serverError({
						text: text,
						uuid: uuid,
						err: stderr
					});
				}

				// AquesTalk コマンド
				var command = [
					'wine',
					command_path + 'AquesTalk2.exe',
					nkfed_filename,
					output_filename,
					speed,
				].join(' ');

				return exec(command, function (error, stdout, stderr) {
					if(stderr) {
						return res.serverError({
							text: text,
							uuid: uuid,
							err: stderr
						});
					}
					if (error !== null) {
						return res.serverError({
							text: text,
							uuid: uuid,
							err: stderr
						});
					}

					// wav を返す
					var stream = fs.createReadStream(output_filename);
					res.type('audio/wav');
					return stream.pipe(res);
				});
			});
		});
	},
};

'use strict';

// ソース元の対象ファイル
var source_dir = './src/js/**/*.js';

// 変換作業用ディレクトリ
var tmp_dir = './tmp/';

// 出力ディレクトリ
var dist_dir = './assets/js/';

// アプリファイル
var appjs = 'app.js';

// minify後のアプリ名ファイル
var appminjs = 'app.min.js';

var watch      = require('gulp-watch');
var browserify = require('browserify');
var gulp       = require('gulp');
var source     = require('vinyl-source-stream');
var uglify     = require("gulp-uglify");
var rename     = require('gulp-rename');
var plumber    = require('gulp-plumber');
var runSequence= require('run-sequence');
var path       = require('path');
var notify     = require('gulp-notify');
var babel      = require("gulp-babel");

gulp.task('babel', function() {
	return gulp.src(source_dir)
	.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
	.pipe(babel())
	.pipe(gulp.dest(tmp_dir));
});

gulp.task('browserify', function() {
	return browserify(path.join(tmp_dir, appjs))
		.bundle()
		.on('error', function(err){   //ここからエラーだった時の記述
			// デスクトップ通知
			var error_handle = notify.onError('<%= error.message %>');
			error_handle(err);
			this.emit('end');
		})
		//Pass desired output filename to vinyl-source-stream
		.pipe(source(appjs))
		// Start piping stream to tasks!
		.pipe(gulp.dest(dist_dir));
});

gulp.task('minify', function() {
	return gulp.src(path.join(dist_dir, appjs))
		.pipe(uglify())
		.pipe(rename(appminjs))
		.pipe(gulp.dest(dist_dir));
});


gulp.task('build', function(callback) {
	return runSequence(
		'babel',
		'browserify',
		'minify',
		callback
	);
});

gulp.task('watch', function() {
	gulp.watch('src/js/**/*.js', ['build']);
});

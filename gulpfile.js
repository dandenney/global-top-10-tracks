// *************************************
//
//   Gulpfile
//
// *************************************
//
// Available tasks:
//   `gulp`
//
// *************************************

// -------------------------------------
//   Plugins
// -------------------------------------
//
// gulp               : The streaming build system
// gulp-sass          : Compile Sass files
// gulp-autoprefixer  : Prefix CSS
// gulp-uglify        : Minify JS using Uglify
// gulp-concat        : Concatenate files
// browser-sync       : Live CSS Reload &amp; Browser Syncing
//
// -------------------------------------

// -------------------------------------
//   Dependencies
// -------------------------------------

var gulp          = require('gulp');
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var browserSync   = require('browser-sync').create();
var concat        = require('gulp-concat');

// -------------------------------------
//   Primary Task
// -------------------------------------

gulp.task('default', ['copy-html', 'copy-data', 'copy-images', 'styles', 'scripts'], function() {
	gulp.watch('src/sw.js', ['copy-sw']);
	gulp.watch('src/styles/**/*.sass', ['styles']);
	gulp.watch('src/js/**/*.js', ['scripts']);
	gulp.watch('src/*.html', ['copy-html']);
	gulp.watch('src/*.html').on('change', browserSync.reload);

	browserSync.init({
		server: './dist'
	});
});

// -------------------------------------
//   Individual Tasks
// -------------------------------------

// ----- Dist ----- //

gulp.task('dist', [
	'copy-sw',
	'copy-html',
	'copy-data',
	'copy-images',
	'styles',
	'scripts',
	'scripts-dist'
]);

// ----- JavaScript ----- //

gulp.task('scripts', function() {
	gulp.src('src/js/**/*.js')
		.pipe(concat('app.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-dist', function() {
	gulp.src('src/js/**/*.js')
		.pipe(concat('app.js'))
		.pipe(gulp.dest('dist/js'));
});

// ----- styles ----- //

gulp.task('styles', function() {
	gulp.src('src/styles/**/*.sass')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('dist/styles'))
		.pipe(browserSync.stream());
});

// ----- HTML ----- //

gulp.task('copy-html', function() {
	gulp.src('src/*.html')
		.pipe(gulp.dest('./dist'));
});

// ----- Service Worker ----- //

gulp.task('copy-sw', function() {
	gulp.src('src/sw.js')
		.pipe(gulp.dest('./dist'));
});

// ----- Data ----- //

gulp.task('copy-data', function() {
	gulp.src('src/data/*')
		.pipe(gulp.dest('dist/data'));
});

// ----- Images ----- //

gulp.task('copy-images', function() {
	gulp.src('src/images/*')
		.pipe(gulp.dest('dist/images'));
});

var gulp = require('gulp');

var del = require('del');
var sequence = require('run-sequence');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var cssmin = require('gulp-cssmin');
var browserSync = require('browser-sync').create();
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');

var port = process.env.SERVER_PORT || 3000;

gulp.task('clean', function (){
  
	return del('./dist/**/*');
	
});

gulp.task('copy:fonts', function(){
	
	return gulp.src('./node_modules/font-awesome/fonts/**/*')
		.pipe(gulp.dest('./dist/fonts'));
	
});

gulp.task('copy:app', function(){
	
	return gulp.src([
		'./src/**/*',
		'!./src/scss',
		'!./src/scss/**/*',
		'!./src/js',
		'!./src/js/**/*'
	])
	.pipe(gulp.dest('./dist'));
	
});

gulp.task('copy', ['copy:app', 'copy:fonts']);

gulp.task('css', function (){
  
	return gulp.src([
		'./node_modules/font-awesome/scss/**/*.scss',
		'./src/scss/**/*.scss'
	]).pipe(sass({
		includePaths: [
			'./node_modules/foundation-sites/scss'
		],
		outputStyle: 'nested',
		precision: 10
	})
	.on('error', sass.logError))
	.pipe(sourcemaps.init())
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(cssmin())
	.pipe(concat('app.css'))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('./dist'));

});

gulp.task('js', function() {
  
	return gulp.src('./src/js/app.js')
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest('./dist'));
	
});

gulp.task('serve', ['build'], function(){

	browserSync.init({
		server: {
			baseDir: "./dist",
		},
		port: port
	});
	
});

gulp.task('watch', function(){
	
	gulp.watch('./src/**/*.!(js|scss)', function(){ return sequence('copy', browserSync.reload); });
	gulp.watch('./src/**/*.scss', function(){ return sequence('css', browserSync.reload); });
	gulp.watch('./src/**/*.js', function(){ return sequence('js', browserSync.reload); });
	
});

gulp.task('build', function(cb){
	
	return sequence('clean', 'copy', 'css', 'js', cb);
	
});

gulp.task('default', function(cb){
	
	return sequence('serve', 'watch', cb);
	
});
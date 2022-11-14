const { src, dest, watch, parallel } = require('gulp'),
	browserSync = require('browser-sync').create(),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	cssmin = require('gulp-cssnano'),
	nested = require('postcss-nested'),
	nestedimport = require('postcss-nested-import'),
	variables = require('postcss-variables'),
	stylelint = require('stylelint'),
	styleconfig = require('./.stylelintrc.json'),
	cssvariables = require('./app/scss/_vars/vars'),
	uglify = require('gulp-uglify-es').default,
	imagemin = require('gulp-imagemin'),
	htmlmin = require('gulp-htmlmin');

function scripts() {
	return src([
		'app/js/slider.js',
		'app/js/formSuccess.js',
		'app/js/scroll.js'
	])
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(dest('app/js'))
		.pipe(browserSync.stream());
}

function styles() {
	const plugins = [
		nested,
		nestedimport,
		variables({
			globals: cssvariables
		}),
		stylelint(styleconfig),
		autoprefixer({
			overrideBrowserslist: ['last 10 version'],
		}),
	];
	return src([
		'app/scss/_main/_main.scss',
		'app/scss/_text/*.scss',
		'app/scss/_components/*.scss',
		'app/scss/html/**/*.scss'
	])
		.pipe(postcss(plugins))
		.pipe(concat('styles.min.css'))
		.pipe(cssmin())
		.pipe(dest('app/css'))
		.pipe(browserSync.stream());
}

function images() {
	return src('app/img/**/*')
		.pipe(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.mozjpeg({ quality: 75, progressive: true }),
			imagemin.optipng({ optimizationLevel: 5 }),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		]))
		.pipe(dest('dist/img'));
}

function fonts() {
	return src('app/fonts/**/*')
		.pipe(dest('dist/fonts'));
}

function htmlminify() {
	return src([
		'app/*.html',

	], { base: 'app' })
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(dest('dist'))
}

function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'app/'
		}
	});
}

function build() {
	images();
	fonts();
	htmlminify();
	return src([
		'app/js/main.min.js',
		'app/css/styles.min.css',
	], { base: 'app' })
		.pipe(dest('dist'));
}

function watching() {
	watch(['app/scss/**/*.scss', '!app/css/styles.min.css'], styles);
	watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
	watch(['app/*.html']).on('change', browserSync.reload);
}

exports.watching = watching;
exports.browsersync = browsersync;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.htmlminify = htmlminify;
exports.build = build;

exports.default = parallel(styles, browsersync, watching, scripts);

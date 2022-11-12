const { src, dest, watch, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const nested = require('postcss-nested');
const stylelint = require('stylelint');
const styleconfig = require('./.stylelintrc.json');


function scripts() {
    return src(['app/js/main.js'])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('main.min.js'))
        .pipe(dest('app/js'))
        .pipe(browserSync.stream());
}

function styles() {
    const plugins = [
        nested,
        stylelint(styleconfig),
        autoprefixer({
            overrideBrowserslist: ['last 10 version'],
        }),
        cssnano(),
    ];
    return src(['app/scss/**/*.scss'])
        // .pipe(require('gulp-css-nbd')())
        .pipe(postcss(plugins))
        .pipe(concat('main.min.css'))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream());
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    });
}

function build() {
    return src([
        'app/js/main.js',
        'app/*.html'
    ], { base: 'app' })
        .pipe(dest('dist'));
}

function watching() {
    watch(['app/scss/**/*.scss', '!app/css/main.min.css'], styles);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    watch(['app/*.html']).on('change', browserSync.reload);
}

exports.watching = watching;
exports.browsersync = browsersync;
exports.styles = styles;
exports.scripts = scripts;
exports.build = build;

exports.default = parallel(styles, browsersync, watching, scripts);

const { dest, src, parallel, watch } = require('gulp');
const concat = require('gulp-concat');
const scss = require('gulp-sass');
const webpack = require('webpack-stream');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');

const styles = () => {
  return src(['./src/scss/*.scss', '!./src/scss/_*.scss'])
    .pipe(scss({ outputStyle: 'expanded' }))
    .pipe(autoprefixer({
      cascade: true,
      overrideBrowsersList: ['last 5 version']
    }))
    .pipe(concat('main.css'))
    .pipe(dest('./docs/css/'))
    .pipe(browserSync.stream());
}

const html = () => {
  return src('./src/*.pug')
    .pipe(pug())
    .pipe(dest('./docs/'))
    .pipe(browserSync.stream());
}

const images = () => {
  return src('./src/images/**/*')
    .pipe(dest('./docs/images/'))
    .pipe(browserSync.stream());
}

const js = () => {
  return src('./src/js/*.js')
    .pipe(webpack())
    .pipe(concat('main.js'))
    .pipe(dest('./docs/js/'))
    .pipe(browserSync.stream());
}

const watching = () => {
  watch('./src/js/*.js', parallel(js));
  watch('./src/images/**/*', parallel(images));
  watch('./src/scss/*.scss', parallel(styles));
  watch('./src/*.pug', parallel(html));
}

const server = () => {
  browserSync.init({
    server: {
      baseDir: './docs/'
    }
  });
}

exports.build = parallel(styles, images, html, js);
exports.default = parallel(exports.build, watching, server);
const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyCss = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const pump = require('pump');

const srcPath = 'src';
const src = {
  scss: `${srcPath}/scss/style.scss`,
  html: `${srcPath}/**/*.html`,
  js: `${srcPath}/js/**/*.js`,
  img: `${srcPath}/img/*`,
}

// Dest set to docs for github pages, feel free to change
const destPath = 'docs';
const dest = {
  css: `${destPath}/css`,
  html: destPath,
  js: `${destPath}/js`,
  img: `${destPath}/img`,
}

gulp.task('sass', () => {
  pump([
    gulp.src(src.scss),
    plumber(err => console.error(err)),
    sass({ style: 'compressed' }).on('error', sass.logError),
    autoprefixer({ browsers: ['last 2 versions'] }),
    minifyCss(),
    gulp.dest(dest.css),
    browserSync.stream({match: '**/*.css'})
  ]);
});

gulp.task('html', () => {
  pump([
    gulp.src(src.html),
    plumber(err => console.error(err)),
    htmlmin({ collapseWhitespace: true, removeComments: true }),
    gulp.dest(dest.html)
  ]);
});

gulp.task('js', () => {
  pump([
    gulp.src(src.js),
    plumber(err => console.error(err)),
    babel({ presets: ['es2015', 'es2017'] }),
    uglify(),
    gulp.dest(dest.js),
    browserSync.stream()
  ]);
});

gulp.task('image', () => {
  pump([
    gulp.src(src.img),
    plumber(err => console.error(err)),
    imagemin({ verbose: true }),
    gulp.dest(dest.img)
  ]);
});

gulp.task('browserSync', ['sass', 'js', 'html'], () => {
  browserSync.init({
    injectChanges: true,
    server: `./${destPath}`,
  });

  gulp.watch(src.scss, ['sass']);
  gulp.watch(src.js, ['js']);
  gulp.watch(src.html, ['html']);
  gulp.watch(src.html).on('change', browserSync.reload);
  gulp.watch(src.js).on('change', browserSync.reload);
});

gulp.task('default', ['browserSync']);

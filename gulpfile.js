var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss'),
    postcssClean = require('postcss-clean'),
    postcssMergeRules = require('postcss-merge-rules'),
    pug = require('gulp-pug'),
    htmlbeautify = require('gulp-html-beautify'),
    browserSync = require('browser-sync').create();

// notify = require('gulp-notify'),

var htmlBeautifyOptions = {
  indentSize: 2
};

var postCSSProcessors = [
  // postcssMergeRules,
  postcssClean
];

var srcPaths = {
  'sass': [
    './src/styles/**/*.sass'
  ],
  'pug': [
    './src/**/*.pug'
  ],
  'images': [
    './src/img/**/*'
  ],
  'toCopy': [
    './src/**/*',
    './src/assets/app/main.js',
    '!./src/styles/**/*',
    '!./src/img/**/*',
    '!./src/app/**/*',
    '!./src/**/*.pug'
  ]
};

gulp.task('sass', function () {
  return gulp.src(srcPaths.sass)
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 5 versions', 'opera 12', '> 1% in RU', 'ie 9']}))
    .pipe(postcss(postCSSProcessors))
    .pipe(gulp.dest('./dist/styles/.'));
});

gulp.task('pug', function () {
  return gulp.src(srcPaths.pug)
    .pipe(pug())
    .pipe(htmlbeautify(htmlBeautifyOptions))
    .pipe(gulp.dest('./dist/.'));
});

gulp.task('images', function () {
  gulp.src(srcPaths.images)
    .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
    .pipe(gulp.dest('./dist/img/'));
});

gulp.task('copy', function () {
  return gulp.src(srcPaths.toCopy, {
    dot: true
  }).pipe(gulp.dest('./dist/.'));
});

gulp.task('watch', function () {
  browserSync.init({
    port: 3030,
    server: {
      baseDir: './dist'
    }
  });
  gulp.watch(srcPaths.sass, ['sass']);
  gulp.watch(srcPaths.pug, ['pug']);
  gulp.watch(srcPaths.toCopy, ['copy']);
  gulp.watch('./dist/**/*').on('change', browserSync.reload);
});
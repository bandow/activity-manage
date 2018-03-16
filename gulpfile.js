'use strict';
 
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
 
gulp.task('sass', function () {
  return gulp.src('./styles/sass/*.scss')
    .pipe(sass({
        //输出方式 nested, expanded, compact, compressed
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        //浏览器设置
        browsers: ['>1%','last 3 versions','Android >= 4.4','iOS 8'],
         //是否美化属性值 默认：true 像这样：
        //-webkit-transform: rotate(45deg);
        //        transform: rotate(45deg);       
        cascade: true, 
    }))
    .pipe(gulp.dest('./styles/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./styles/sass/*.scss', ['sass']);
});


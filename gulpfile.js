var gulp = require('gulp');
// 重命名
var rename = require('gulp-rename');
// 服务端
var connect = require('gulp-connect');
// 删除文件
var del = require('del');
// 样式处理
var less = require('gulp-less');
// 压缩样式
var minicss = require('gulp-minify-css');
// 初始设置
var Build = {
  root: 'dist/',
  css: 'dist/css',
  fonts: 'dist/fonts',
  img:'dist/image',
  js:'dist/js'
};
// 样式处理
gulp.task('less', function () {
  gulp.src(['less/*.less', '!less/_*.less'])
    .pipe(less())
    .pipe(minicss())
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest('css'))
    .pipe(connect.reload())
});
// 交互处理
gulp.task('js', function () {
  gulp.src(['js/*.js'])
    .pipe(connect.reload())
});
// 图片处理
gulp.task('img', function () {
  gulp.src(['img/**'])
    .pipe(connect.reload())
});
// 自动加入HTML
gulp.task('html', function () {
  gulp.src('index.html')
    .pipe(connect.reload())
});
// 打包
gulp.task('build', function () {
  del('dist/*')
    .then(function () {
      gulp.src('css/**').pipe(gulp.dest(Build.css));
      gulp.src('js/**').pipe(gulp.dest(Build.js));
      gulp.src('image/**').pipe(gulp.dest(Build.img));
      gulp.src('fonts/**').pipe(gulp.dest(Build.fonts));
      gulp.src('index.html').pipe(gulp.dest(Build.root));
    })
});
// 自动刷新
gulp.task('connect', function () {
  connect.server({
    livereload: true,
    port: 3000
  });
});
// 监听
gulp.task('watch', function () {
  gulp.watch('less/**', ['less']);
  gulp.watch('js/**', ['js']);
  gulp.watch('img/**', ['img']);
  gulp.watch('index.html', ['html']);
});
// 默认启动依赖
gulp.task('default', ['html', 'less', 'watch', 'connect', 'img', 'js']);

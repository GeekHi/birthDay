const gulp = require('gulp');
const browserSync = require("browser-sync").create(), //自动刷新
    reload = browserSync.reload;
 const filter = require('gulp-filter');
// gulp-filter 包， 以确保只有 *.css 文件响应 .reload - 这样一来，
// 您还是会得到CSS注入，而不是整个页面重载。
const useref = require('gulp-useref'); //合并JS
const uglify = require('gulp-uglify'); //js压缩
const minifyCSS = require('gulp-minify-css'); //压缩css

var gulpIf = require('gulp-if');

var del = require('del');
// var watch = require('gulp-watch');//监视

var minifyHtml = require("gulp-minify-html");//压缩html
// var babel = require("gulp-babel");
// var jshint = require("gulp-jshint");//js检查
var imagemin = require('gulp-imagemin');//压缩图片文件
// var pngquant = require('imagemin-pngquant'); //png图片压缩插件
var connect = require('gulp-connect');//引入gulp-connect模块 浏览器刷新
var cache = require('gulp-cache');//压缩图片可能会占用较长时间，使用 gulp-cache 插件可以减少重复压缩。
var RevAll = require("gulp-rev-all");//md5后缀

gulp.task('html',function(){//编译html
    return gulp.src('index.html')
    .pipe(minifyHtml())
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
})

gulp.task('css',function(){//编译scss
    return gulp.src('style/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/style')) //当前对应css文件
    .pipe(connect.reload());//更新
})
 
gulp.task('js',function(){//编译ES6并且压缩
    return gulp.src('libs/**/*.js')
    .pipe(uglify())//压缩js
    .pipe(gulp.dest('dist/libs'))
    .pipe(connect.reload());
})

gulp.task('fonts', function() {
    return gulp.src('fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
})

gulp.task('sound', function() {
    return gulp.src('sound/**/*')
        .pipe(gulp.dest('dist/sound'))
})

gulp.task('images', function() {
    return gulp.src('image/*')
        .pipe(cache(imagemin({//压缩图片文件
        interlaced: true,
        })))
        .pipe(gulp.dest('dist/image'))
});

gulp.task('clean:app/dist', function() {//删除之前生成的文件
    return del(['dist']);
});

gulp.task('clean:dist', function() {//异步清理除dist目录图片以外的文件
     return del(['dist/**/*', '!dist/image', '!dist/image/**/*']);
});

gulp.task('minFs', function() {//压缩文件
    return gulp.src('dist/*.html')
        .pipe(useref())//合并js
        .pipe(
            gulpIf('*.js',uglify())//压缩js
        )
        .pipe(gulpIf('*.css', minifyCSS()))//压缩css
        .pipe(RevAll.revision({//不被重命名
            dontRenameFile:[/^\/favicon.ico$/g, ".html"]
        }))  
        .pipe(gulp.dest('dist'));
});

gulp.task('connect:app',function(){
    connect.server({
        root:'birthDay2021',//根目录
        // ip:'192.168.11.62',//默认localhost:8080
        livereload:true,//自动更新
        port:9998//端口
    })
})

gulp.task('connect:dist',function(cb){
    connect.server({
        root:'birthDay2021',//根目录
        // ip:'192.168.11.62',//默认localhost:8080
        livereload:true,//自动更新
        port:9999//端口
    })
    cb()//执行回调，表示这个异步任务已经完成，起通作用,这样会执行下个任务
})

gulp.task('watchs',function(){//监听变化执行任务
    //当匹配任务变化才执行相应任务
    gulp.watch('*.html',gulp.series('html'));
    gulp.watch('style/**/*.scss',gulp.series('css'));
    gulp.watch('libs/**/*.js',gulp.series('js'));
    gulp.watch('fonts/**/*',gulp.series('fonts'));
    gulp.watch('image/**/*',gulp.series('images'));
})

//gulp.series|4.0 依赖顺序执行
//gulp.parallel|4.0 多个依赖嵌套'html','css','js'并行

//下面1和2分别运行

//1.自动监测文件变化并刷新浏览器

//初始生成app/dist目录
gulp.task('init',gulp.series('clean:app/dist',gulp.parallel('html','css','js','fonts','images','sound')));

//启动任务connect:app服务，并监控变化
gulp.task('run',gulp.series('init','connect:app','watchs'));

//2.生成打包文件
gulp.task('build',gulp.series('clean:dist',gulp.parallel('init'),'minFs'));

//启动任务connect:dist服务，生成打包文件后，监控其变化
gulp.task('serve',gulp.series('connect:dist','build','clean:app/dist','watchs'));

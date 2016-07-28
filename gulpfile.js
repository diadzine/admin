var gulp = require('gulp');

// Load plugins
var $ = require('gulp-load-plugins')();

// Config
var config = {
     bowerDir: './app/bower_components' ,
    buildPath: './dist',
     cssPath: './dist/styles',
    fontsPath: './app/fonts',
     htmlPath: './app',
    imagesPath: './app/images',
     jsPath: './app/scripts',
     sassPath: './app/styles',
}

gulp.task('connectDev', function () {
  $.connect.server({
    root: ['app', 'tmp'],
    port: 8001,
    livereload: true
  });
});

gulp.task('connectDist', function () {
  $.connect.server({
    root: 'dist',
    port: 8002,
    livereload: true
  });
});

gulp.task('bower', function() { 
    return $.bower({
            interactive: true
        })
         .pipe(gulp.dest(config.bowerDir)) ;
});

gulp.task('bower-components', function() { 
    return gulp.src(config.htmlPath + '/bower_components/**/*')
         .pipe(gulp.dest(config.buildPath + '/bower_components')) ;
});

gulp.task('fonts', function () {
    return gulp.src(config.fontsPath + '/*.ttf')
        .pipe(gulp.dest(config.buildPath + '/fonts'))
        .pipe($.connect.reload());
});

gulp.task('html', function () {
    return gulp.src([
            config.htmlPath + '/**/*.html',
            '!' + config.htmlPath + '/bower_components/**/*.html'
        ])
        .pipe($.useref())
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.cleanCss()))
        .pipe(gulp.dest(config.buildPath))
        .pipe($.connect.reload());
});

gulp.task('images', function () {
    return gulp.src([config.imagesPath + '/**/*.{gif,ico,jpg,png,svg}'])
        .pipe(gulp.dest(config.buildPath + '/images'))
        .pipe($.connect.reload());
});

gulp.task('misc', function () {
    return gulp.src([
            config.htmlPath + '/favicon.ico',
            config.htmlPath + '/robots.txt'
        ])
        .pipe($.cache(gulp.dest(config.buildPath)))
        .pipe($.connect.reload());
});

gulp.task('styles', function () {
    return gulp.src(config.sassPath + '/main.scss')
        .pipe($.sass({
            style: 'expanded',
            loadPath: [
                config.sassPath,
                config.bowerDir
            ]
        }))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe($.cache(gulp.dest(config.sassPath)))
        .pipe($.cleanCss())
        .pipe($.cache(gulp.dest(config.cssPath)))
        .pipe($.connect.reload());
});

// gulp.task('scripts', function () {
//     return gulp.src(config.jsPath + '/**/*.js')
//         .pipe($.concat('scripts.js'))
//         .pipe($.rename({suffix: '.min'}))
//         .pipe($.uglify())
//         .pipe($.cache(gulp.dest(config.buildPath + '/scripts')))
//         .pipe($.rev())
//         .pipe($.cache(gulp.dest(config.buildPath + '/scripts')))
//         .pipe($.rev.manifest(config.buildPath + '/rev-manifest.json', {
//             base: config.buildPath,
//             merge: true
//         }))
//         .pipe($.cache(gulp.dest(config.buildPath)))
//         .pipe($.connect.reload());
// });

gulp.task("revision", ["styles", "html"], function(){
  return gulp.src(["dist/**/*.css", "dist/**/*.js"])
    .pipe($.rev())
    .pipe(gulp.dest(config.buildPath))
    .pipe($.rev.manifest())
    .pipe(gulp.dest(config.buildPath))
})

gulp.task("revreplace", ["revision"], function(){
  var manifest = gulp.src(config.buildPath + "/rev-manifest.json");

  return gulp.src(config.buildPath + "/index.html")
    .pipe($.revReplace({manifest: manifest}))
    .pipe(gulp.dest(config.buildPath));
});

gulp.task('watch', function () {
    // Watch font files
    gulp.watch([config.fontsPath + '/*'], ['fonts']);

    // Watch .html files
    gulp.watch([
        config.htmlPath + '/**/*.html',
        config.htmlPath + '/favicon.ico',
        config.htmlPath + '/robots.txt'
    ], ['html']);

    // Watch images
    gulp.watch([config.imagesPath + '/**/*.{gif,ico,jpg,png,svg}'], ['images']);

    // Watch misc files
    gulp.watch([
        config.htmlPath + '/favicon.ico',
        config.htmlPath + '/robots.txt'
    ], ['misc']);

    // Watch .scss files
    gulp.watch([config.sassPath + '/**/*.scss'], ['styles']);

    // Watch .js files
    // gulp.watch(config.jsPath + '/**/*.js', ['scripts']);
});

gulp.task('clean-cache', function () {
    return $.cache.clearAll();
});

gulp.task('clean', ['clean-cache'], function () {
    return gulp.src(config.buildPath + '/*', {read: false})
        .pipe($.rimraf());
});

// Build
gulp.task('build', ['clean'], function () {
    gulp.run('bower', 'bower-components', 'fonts', 'html', 'images', 'styles', 'revreplace');
});

// Deploy on gh-pages branch
gulp.task('deploy', function() {
    return gulp.src(config.buildPath + '/**/*')
        .pipe($.ghPages());
});

// Dist serve
gulp.task('serve', ['connectDist']);

// Default task
gulp.task('default', ['connectDev', 'build', 'watch']);

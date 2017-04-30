"use strict";

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    tsc = require('gulp-typescript'),
    tsProject = ts.createProject('tsconfig.json')
    merge = require('merge2'),
    bundleconfig = require('./bundleconfig.json');

var regex = {
    sass: /\.sass$/,
    ts: /\.ts$/,
    css: /\.css$/,
    html: /\.(html|htm)$/,
    js: /\.js$/
};

var paths = {
    bower: "./bower_components/",
    webroot: "./" + project.webroot + "/"
};

paths.app = paths.webroot + "app/";
paths.js = paths.webroot + "js/";
paths.jsMin = paths.js + "**/*.min.js";
paths.ts = "./scripts/**/*.ts";
paths.typings = "./typings/";
paths.css = paths.webroot + "css/";
paths.cssMin = paths.css + "**/*.min.css";
paths.scripts = [
    "./scripts/**/*.js",
    "./scripts/**/*.ts",
    "./scripts/**/*.map"
];

function getBundles(regexPattern) {
    return bundleconfig.filter(function (bundle) {
        return regexPattern.test(bundle.outputFileName);
    });
}

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task("min", ["min:js", "min:css"]);

gulp.task("min:js", function () {
    //var tsResult = gulp.src(paths.ts)
    //    .pipe(tsc(tsProject()));

    //return tsResult.js.pipe(gulp.dest(paths.js + 'site.min2.js'));
    // ts is set to build on save but does not exist in repository
    // need to rebuild in gulp task and remove SaveOnSave feature

    var tasks = getBundles(regex.js).map(function (bundle) {
        return gulp.src(bundle.inputFiles, { base: "." })
            .pipe(concat(bundle.outputFileName))
            .pipe(uglify())
            .pipe(gulp.dest("."));
    });
    return merge(tasks);
});

gulp.task("min:css", function () {
    var tasks = getBundles(regex.css).map(function (bundle) {
        return gulp.src(bundle.inputFiles, { base: "." })
            .pipe(concat(bundle.outputFileName))
            .pipe(cssmin())
            .pipe(gulp.dest("."));
    });
    return merge(tasks);
});

gulp.task("compile:ts", function () {
    var tsResult = gulp.src(scripts)
        .pipe(tsc(tsProject));

    return tsResult.js.pipe(gulp.dest(paths.jsDest));
})


gulp.task("clean", function () {
    var files = bundleconfig.map(function (bundle) {
        return bundle.outputFileName;
    });

    return del(files);
});


gulp.task("watch", function () {
    getBundles(regex.js).forEach(function (bundle) {
        gulp.watch(bundle.inputFiles, ["min:js"]);
    });

    getBundles(regex.css).forEach(function (bundle) {
        gulp.watch(bundle.inputFiles, ["min:css"]);
    });
});
const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();



function scssTask(){
  return src('src/scss/style.scss', {sourcemaps: true})
    .pipe(sass(
      {
        errLogToConsole: true,
      }
    ))
    .on('error', console.error.bind(console))
    .pipe(dest('dist/css'))
    .pipe(postcss([cssnano()]))
    .pipe(
      rename({
          suffix: '.min',
      })
    )
    .pipe(dest('dist/css', {sourcemaps: '.'}));
}


function jsTask(){
  return src('src/js/main.js', {sourcemaps: true})
    .pipe(dest('dist/js'))
    .pipe(terser())
    .pipe(
      rename({
          suffix: '.min',
      })
    )
    .pipe(dest('dist/js', {sourcemaps: '.'}));
}

function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: '.'
    }
  });
  cb();
}

function browsersyncReload(cb){
  browsersync.reload();
  cb();
}
function watchTask(){
  watch('*.html', browsersyncReload);
  watch(['src/scss/**/*.scss', 'src/js/**/*.js'], series(scssTask, jsTask, browsersyncReload));
}

// Default Gulp Task
exports.default = series(
  scssTask,
  jsTask,
  browsersyncServe,
  watchTask
);

























































// const gulp = require("gulp");
// const sass = require("gulp-sass")(require("sass"));

// const rename = require("gulp-rename");
// const browserSync = require("browser-sync").create();
// var uglify = require("gulp-uglify");
// const babel = require("gulp-babel");

// function style() {
// return (
//     gulp
//       .src("./src/scss/**/*.scss")
//       .pipe(
//         sass({
//           errLogToConsole: true,
//         })
//       )
//       .on("error", console.error.bind(console))
//       .pipe(gulp.dest("./dist/css"))
//       .pipe(
//         sass({
//           errLogToConsole: true,
//           outputStyle: "compressed",
//         })
//       )
//       .pipe(
//         rename({
//           suffix: ".min",
//         })
//       )
//       .pipe(gulp.dest("./dist/css"))
//       .pipe(browserSync.stream())
//   );
// }

// function javascript() {
//   return (
//     gulp
//       .src("./src/**/*.js")
//       .pipe(
//         babel({
//           presets: ["@babel/env"],
//         })
//       )
//       .pipe(gulp.dest("./dist/js"))
//       .pipe(uglify())
//       .pipe(
//         rename({
//           suffix: ".min",
//         })
//       )
//       .pipe(gulp.dest("./dist/js"))
//       .pipe(browserSync.stream())
//   );
// }

// function defaultTask() {
//   browserSync.init({
//     server: {
//         baseDir: './',
//     },
//   });
//   style();
//   javascript();
//   gulp.watch('./src/scss/**/*.scss', style, browserSync.reload);
//   gulp.watch("./*.html").on("change", browserSync.reload);
//   gulp.watch("./src/**/*.js").on("change", javascript, browserSync.reload);
// }

// exports.style = style;
// exports.default = defaultTask;

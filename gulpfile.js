const { series, watch, src, dest } = require("gulp");
const sass = require("gulp-sass");
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;


function copyHTML(cb) {
  src("src/pages/*.html").pipe(dest("dist/"))
  cb();
}

function sassCompile(cb) {
  src('src/sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(dest("dist/"))
  .pipe(browserSync.stream());
cb();
}

function copyJs(cb) {
    src("src/js/*.js").pipe(dest("dist/"));
    cb();
  }

function serve(cb){
  browserSync.init({
    server: "./dist"
  })
  cb();
}

function develop(cb){
  watch("src/pages/*.html", series(copyHTML,reload));
  watch('src/sass/**/*.scss', series(sassCompile))
  watch('src/js/**/*.js', series(copyJs,reload))
  cb();
}


exports.default = series(copyHTML,sassCompile,copyJs,serve, develop);

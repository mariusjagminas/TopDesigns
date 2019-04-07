const { series, watch, src, dest } = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const ghpages = require("gh-pages");
const clean = require("gulp-clean");
const rename = require("gulp-rename");

// ----- Development --------------//

function copyHTML(cb) {
  src("src/*.html").pipe(dest("dist/"));
  cb();
}

function sassCompile(cb) {
  src("src/sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(
      rename({
        basename: "styles",
        suffix: ".min",
        extname: ".css"
      })
    )

    .pipe(dest("dist/"))
    .pipe(browserSync.stream());
  cb();
}

function copyJS(cb) {
  src(["src/js/progressbar.min.js", "src/js/main.js"])
    .pipe(concat("bundle.min.js"))
    .pipe(dest("dist/"));
  cb();
}

function serve(cb) {
  browserSync.init({
    server: "./dist"
  });
  cb();
}

function develop(cb) {
  watch("src/*.html", series(copyHTML, reloadPage));
  watch("src/sass/**/*.scss", series(sassCompile));
  watch("src/js/**/*.js", series(copyJS, reloadPage));
  cb();
}

function reloadPage(cb) {
  browserSync.reload();
  cb();
}

// --------- Production ---------------//

function buildJS(cb) {
  src(["src/js/progressbar.min.js", "src/js/main.js"])
    .pipe(concat("bundle.min.js"))
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(uglify())
    .pipe(dest("dist/"));
  cb();
}

function buildCSS(cb) {
  src("src/sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        browsers: ["> 0.2%,last 2 versions"],
        cascade: false
      })
    )
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(
      rename({
        basename: "styles",
        suffix: ".min",
        extname: ".css"
      })
    )
    .pipe(dest("dist/"));
  cb();
}

function buildHTML(cb) {
  src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(dest("dist/"));
  cb();
}

// ---- Custom Tasks ------------//

function deleteFiles(cb) {
  src(["dist/*.html", "dist/*.js", "dist/*.css"]).pipe(clean({ read: false }));
  cb();
}

function optimizeImages(cb) {
  src("src/img/*")
    .pipe(imagemin({ verbose: true }))
    .pipe(dest("dist/optimized-images"));
  cb();
}

function deployGHPages(cb) {
  ghpages.publish("dist", err => console.log(err ? err : "Deployed !!!!!!!"));
  cb();
}

exports.default = series(sassCompile, copyJS, copyHTML, serve, develop);
exports.build = series(buildJS, buildCSS, buildHTML, serve);
exports.image = optimizeImages;
exports.deploy = deployGHPages;
exports.delete = deleteFiles;

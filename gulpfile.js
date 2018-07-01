// gulp things
const gulp = require('gulp')
const del = require('del')
const plumber = require('gulp-plumber')
const cp = require('child_process')

// hugo things
const hugoBin = require('hugo-bin')

// js things
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackConfig = require('./webpack.config')

// css things
const postcss = require('gulp-postcss')
const atImport = require('postcss-import')
const cssnext = require('postcss-cssnext')

// image things
const imagemin = require('gulp-imagemin')

// dev server things
const browserSync = require('browser-sync').create()

// what goes where?
const outputDir = 'dist'

// task clean
// clean up the build output
function clean(cb) {
  return del([outputDir])
  cb()
}

// task generate
// builds the files in site/ with hugo
function generate(cb) {
  const args = ['-d', '../dist', '-s', 'site']
  return cp
    .spawn(hugoBin, args, { stdio: 'inherit' })
    .on('close', function(code) {
      if (code === 0) {
        browserSync.reload()
        cb()
      } else {
        console.error('hugo build failed with code: ' + code)
        browserSync.notify('hugo build failed 😞')
        cb('hugo build failed 😞')
      }
    })
}

// task styles
// compiles css with cssnext and imports
const cssconfig = [atImport({ from: './assets/css/main.css' }), cssnext()]
function styles() {
  return gulp
    .src('assets/css/*.css')
    .pipe(plumber())
    .pipe(postcss(cssconfig))
    .pipe(gulp.dest(`${outputDir}/css`))
    .pipe(browserSync.stream())
}

// task scripts
// transpiles and bundles javascript
// use ES6 and all that other fun stuff
function devScripts() {
  return gulp
    .src('assets/js/main.js')
    .pipe(webpackStream(webpackConfig.dev, webpack))
    .pipe(gulp.dest(`${outputDir}/js`))
    .pipe(browserSync.stream())
}

function prodScripts() {
  return gulp
    .src('assets/js/main.js')
    .pipe(webpackStream(webpackConfig.prod, webpack))
    .pipe(gulp.dest(`${outputDir}/js`))
}

// task images
// copy and minify images
function images() {
  return gulp
    .src('assets/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(`${outputDir}/img`))
    .pipe(browserSync.stream())
}

// task fonts
// copy fonts from source to build
function fonts() {
  return gulp
    .src('assets/fonts/**/*')
    .pipe(gulp.dest(`${outputDir}/fonts`))
    .pipe(browserSync.stream())
}

// task watch
// watch for changes and run appropriate tasks
function watch() {
  browserSync.init({ server: `./${outputDir}`, open: false })
  gulp.watch('assets/css/**/*', styles)
  gulp.watch('assets/js/**/*', devScripts)
  // gulp.watch('assets/img/**/*', images)
  gulp.watch('assets/fonts/**/*', fonts)
  gulp.watch('site/**/*', generate)
}

// register tasks
// exports.clean = clean
// exports.styles = styles
// exports.fonts = fonts
// exports.images = images
// exports.watch = watch
// exports.generate = generate

const assets_dev = gulp.parallel(styles, fonts, devScripts)
const assets_prod = gulp.parallel(styles, fonts, prodScripts)

const build = gulp.series(clean, generate, assets_prod)

const develop = gulp.series(clean, generate, assets_dev, watch)

gulp.task('develop', develop)
gulp.task('build', build)

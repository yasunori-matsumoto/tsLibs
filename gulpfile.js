/* ===================================================================   <
 *	gulp_settings by Yasu MatsuMoto
 * 	require gulp -g, typescript -g, stylus -g
 ===================================================================   */

//- ===================================================================  importorts <
var config         = require('./config');
var gulp           = require('gulp');
var mainBowerFiles = require('main-bower-files');
var path           = require('path');
var plumber        = require('gulp-plumber');
var concat         = require('gulp-concat');
var changed        = require('gulp-changed');
var gulpif         = require('gulp-if');
var rename         = require('gulp-rename');
var replace        = require('gulp-replace');
var browserSync    = require('browser-sync');
var connectSSI     = require('connect-ssi');
var cache          = require('gulp-cached');

//- . . . . . . . . . . . . . . . . . . js <

// var strip    = require('gulp-strip-comments');
// var webpack    = require('webpack-stream');
// var typescript = require('gulp-typescript');
// var uglify     = require('gulp-uglify');
// var prettify = require('gulp-jsbeautifier');
var webpack = require('webpack');

//- . . . . . . . . . . . . . . . . . . css <
var stylus         = require('gulp-stylus');
var nib            = require('nib');
var pleeease       = require('gulp-pleeease');
var cssmin         = require('gulp-minify-css');

//- . . . . . . . . . . . . . . . . . . html <
var jade           = require('gulp-jade');

//- . . . . . . . . . . . . . . . . . . image <
var imagemin       = require('gulp-imagemin');
var spritesmith    = require('gulp.spritesmith');
var pngquant       = require('imagemin-pngquant');

//- . . . . . . . . . . . . . . .  . . . font <
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');

//- ----------------------------------------------------------- makeLibs <
gulp.task('bower', function() {
  gulp.src(mainBowerFiles({debugging : true, checkExistence : true}))
  .pipe(concat('libs.js'))
  .pipe(gulp.dest(config.dir.src + 'assets/js'));
});

//- ----------------------------------------------------------- copy static files <
gulp.task('copyStaticFiles', function() {
  gulp.src([config.dir.src + '**/*.+(css|js|def|xml|mp4|json|zip|inc)', '!' + config.dir.src + '**/tsconfig*', '!' + config.dir.src + '**/_*/*'])
    .pipe(changed( config.dir.dest ))
    .pipe(gulp.dest(config.dir.dest));
});

//- ===================================================================  stylesheets <
gulp.task('stylus', function(){
  gulp.src(config.stylus.src)
  .pipe(plumber())
  .pipe(cache('stylus'))
  .pipe(changed( config.dir.dest ))
  //- ----------------------------------------------------------- styls <
  .pipe(gulpif(/[.]styl$/, stylus(config.stylus.options)))
  //- -----------------------------------------------------------  utils <
  .pipe(
    pleeease({
      autoprefixer : {
        browsers : config.stylus.prefixer
      },
      minifier: config.IS_MIN
    })
  )
  .pipe(gulpif(!config.IS_MIN, replace(/\n\n/g, '\n')))
  .pipe(gulpif(config.IS_HARDCASE, replace(/    /g, '\t')))
  .pipe(gulpif(config.IS_MIN, cssmin({compatibility: 'ie8', keepBreaks:true, rebase:false})))
  .pipe(gulp.dest(config.dir.dest))
  .pipe(browserSync.reload({stream: true}));
});


//- ----------------------------------------------------------- jade <
gulp.task('jade', function () {
  gulp.src(config.jade.src)
    .pipe(changed( config.dir.dest ))
    .pipe(plumber())
    .pipe(cache('jade'))
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulpif(config.IS_HARDCASE, replace(/  /g, '\t')))
    .pipe(gulp.dest(config.dir.dest))
    .pipe(browserSync.reload({stream: true}));
});

//- ----------------------------------------------------------- image optimize <
gulp.task('optimizeImage', function(){
  var srcGlob = config.dir.src + '**/*.+(jpg|jpeg|png|gif|svg)';
  var _quality = '80-90';
  var imageminOptions = {
    optimizationLevel: 3, //-  low< 1-7 >high
    use: [pngquant({
      quality: _quality, //-  0 (worst) to 100 (perfect) :String
      speed: 1
    })]
  };
  gulp.src( [config.dir.src + '**/*.+(jpg|jpeg|png|gif|svg)',  '!' + config.dir.src + '**/_*/*'])
    .pipe(changed( config.dir.dest ))
    .pipe(imagemin(imageminOptions))
    .pipe(gulp.dest( config.dir.dest ));
});
//- ----------------------------------------------------------- css sprite <

var SPRITE_MODE = {
  ASSETS  : 0
};

gulp.task('makeSprite',  function () {
  var _source, _imgOutput, _scssOutput, _prefix, _mode;
  _scssOutput = config.dir.src + 'assets/css/sprites/';
  _imgOutput  = config.dir.src + 'assets/img/sprites/';

  //- . . . . . . . . . . . . . . .  . . . config Mode <
  _mode = SPRITE_MODE.ASSETS;
  
  //- . . . . . . . . . . . . . . .  . . . config Mode <
  switch (_mode) {
    case SPRITE_MODE.ASSETS :
      _prefix     = 'assets';
      _source     = config.dir.src + 'assets/img/_src/';
    break;
  }
  
  console.log('===================================================================');
  console.log('sprite_mode : ' + _prefix);
  console.log('sprite_direc : ' + _source);
  console.log('_imgOutput : ' + _imgOutput);
  console.log('. . . . . . . . . . . . . . .  . . .');

  var spriteData = gulp.src(_source + '*.png')
  .pipe(spritesmith({
    imgName  : 'sprite_' + _prefix + '.png',
    cssName  : '_' + _prefix + '.styl',
    imgPath  : '../img/sprites/sprite_' + _prefix + '.png',
    cssFormat: 'stylus',
    padding  : 20,
    cssVarMap: function (sprite) {
      sprite.name = _prefix + '_' + sprite.name;
    },
    cssOpts: {
      functions: false
    }
  }));
  spriteData.img.pipe(gulp.dest(_imgOutput));
  spriteData.css.pipe(gulp.dest(_scssOutput));
});

// gulp.task('webpack' ,function(){
//   gulp.src([config.dir.src + '_webpack/**/*.js'])
//   .pipe(plumber())
//   // .pipe(cache('webpack'))
//   .pipe(webpack(config.webpack))
//   // .pipe(prettify({
//   //   indentSize:2,
//   //   indentWithTabs : false,
//   //   // braceStyle: "collapse",
//   //   // jslintHappy : true
//   // }))
//   .pipe(gulp.dest(config.dir.dest + 'assets/js/'))
//   .pipe(browserSync.reload({stream: true}));
// });
//
function onBuild() {
  return function(err, stats) {
    if(err) {
      console.log('Error', err);
    } else {
      console.log(stats.toString());
    }
    browserSync.reload();
  }
}

gulp.task('webpack', function() {
  // webpack(webpackconfig).watch(100, onBuild())
  webpack(config.webpack).watch(100, onBuild())
});


gulp.task('iconfont', function() {
  gulp.src(config.fonts.src)
    .pipe(iconfont({
      fontName: config.fonts.fontName,
      appendUnicode : true,
      normalize: true,
      timestamp: Math.round(Date.now() / 1000),
      formats: ['ttf', 'eot', 'woff', 'svg', 'woff2']
    }))
    .on('glyphs', function(glyphs, options) {
      
      gulp.src(config.fonts.template)
      .pipe(consolidate('lodash', {
        glyphs: glyphs,
        fontName: config.fonts.fontName,
        fontPath: '../fonts/',
        className: config.fonts.fontName
      }))
      .pipe( gulp.dest( config.dir.src + 'assets/css/fonts/' ) );
    })
  .pipe( gulp.dest( config.fonts.dest) );
});
//- ----------------------------------------------------------- watch <
gulp.task('watch', ['copyStaticFiles', 'webpack'], function () {
    browserSync({
      server: {
        baseDir: config.dir.dest,
        middleware : [
          connectSSI({
            baseDir: config.dir.dest,
            ext:'.html'
          })
        ]
      }
    });
    gulp.watch(config.dir.src + '**/*.jade', ['jade']);
    gulp.watch(config.dir.src + '**/*.styl', ['stylus']);
    // gulp.watch(config.dir.src + '**/*.ts', ['webpack']);
    gulp.watch(config.dir.src + 'assets/fonts/_src/*.svg', ['iconfont']);
});
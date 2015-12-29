var projectName = 'kd';
var IS_MIN      = false;
var IS_HARDCASE = false;
var IS_PC       = true;

var src = IS_PC ? './src/' : './src/';
var dest = IS_PC ? './_git/public_html/' : './_git/public_html/';

var nib            = require('nib');
var path = require("path");
var current = process.cwd();
var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
  IS_PC : IS_PC,
  dir : {
    src : src,
    dest : dest
  },
  jade : {
    src : [src + '**/*.jade' , '!' + src + '**/_*/*']
  },
  ts: {
    src: [src + '**/**/*.ts'],
    dest: dest,
    options: {
      target: "ES5",
      removeComments: true,
      sortOutput : true,
      noImplicitAny  : false,
      noEmitOnError  : false,
      module         : 'commonjs',
      typescript     : require('typescript')
    }
  },
  stylus: {
    src: [src + '**/*.styl', '!' + src + '**/_*'],
    dest : dest,
    options : {
      use : nib(),
      linenos : false,
      compress : false
    },
    prefixer : IS_PC ? ['last 4 versions','ie 8', 'ie 9', 'Firefox >= 2'] : ['last 2 versions', 'ios 6', 'android 4']
  },
  webpack: {
    entry: {
      index : src + 'assets/js/kokudai/index.ts',
      assets : src + 'assets/js/kokudai/assets.ts',
      search : src + 'assets/js/kokudai/search.ts',
      movie : src + 'assets/js/kokudai/movie.ts'
    },
    output: {
      path : dest + 'assets/js/',
      filename: '[name].js',
      sourcePrefix : '',
      devtoolLineToLine : 'disabled',
      pathinfo : false,
      sourceMapFilename : 'sourcemap.js',
      jsonpFunction : projectName
    },
    externals : {
    },
    resolve: {
      root: [path.resolve(__dirname, 'src/assets/js')],
      extensions: ['', '.js', '.ts']
    },
    module : {
      loaders: [
        {test: /\.ts$/, loader:'ts-loader'}
      ]
    },
    plugins : [
      new webpack.ProvidePlugin({
        Event : 'ex/events/Event',
        EventDispatcher : 'ex/events/EventDispatcher',
        MouseEvent : 'ex/events/MouseEvent',
        Ease : 'ex/easing/Ease'
      }),
      new CommonsChunkPlugin("assets", "assets.js"),
      new webpack.optimize.DedupePlugin(),
      // new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        sourceMap:true,
        beautify : true,
        mangle : false
      })
    ],
  },
  fonts : {
    src: [src + 'assets/fonts/_src/*.svg'],
    template : '_icons.styl',
    dest: dest + 'assets/fonts/',
    fontName : 'kf',
    template_dest : src + 'assets/css/fonts/'
  }
}
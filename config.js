var nib            = require('nib');

var IS_MIN      = false;
var IS_HARDCASE = false;
var IS_PC       = true;

var src = IS_PC ? './src/' : './src/sp/';
var dest = IS_PC ? './_git/public_html/' : './_git/public_html/sp/';


var path = require("path");
var current = process.cwd();
var webpack = require('webpack');
var BowerWebpackPlugin = require("bower-webpack-plugin");

module.exports = {
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
      top : src + 'assets/js/Main.ts'
    },
    output: {
      path : __dirname,
      filename: '[name].example.js',
      sourcePrefix : '',
      devtoolLineToLine : 'disabled',
      pathinfo : false,
    },
    externals : {
    },
    resolve: {
      root: [path.resolve(__dirname, 'src/assets/js')],
      // root: [path.join(__dirname, "bower_components")],
      extensions: ['', '.js', '.ts'],
      moduleDirectories : ['bower_components']
    },
    module : {
      loaders: [
        {test: /\.ts$/, loader:'ts-loader'},
        {test: /\.jade$/, loader: "jade-loader"}
      ]
    },
    plugins : [
      new webpack.ProvidePlugin({
        Event : 'ex/events/Event',
        EventDispatcher : 'ex/events/EventDispatcher',
        MouseEvent : 'ex/events/MouseEvent'
      }),
      // new webpack.ProvidePlugin({
      // }),
      // new webpack.BannerPlugin('test', {entry:true}),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        sourceMap:false,
        beautify : true,
        mangle : false
      }),
      new BowerWebpackPlugin({
        // modulesDirectories: ['bower_components'],
        manifestFiles:      "bower.json",
        // includes:           /.*/,
        // excludes:           [],
        // searchResolveModulesDirectories: true
      })
    ]
  },
  fonts : {
    src: [src + 'assets/fonts/_src/*.svg'],
    template : '_icons.styl',
    dest: dest + 'assets/fonts/',
    fontName : 'font',
    template_dest : src + 'assets/css/fonts/'
  }
}
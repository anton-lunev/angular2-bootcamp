const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const cssnext = require('postcss-cssnext');
const path = require('path');

const appDir = __dirname + '/src';

const config = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'main': './src/main.ts'
    },

    output: {
        path: './dist',
        publicPath: 'http://localhost:9090/',
        filename: 'js/[name].js',
        chunkFilename: '[id].chunk.js'
    },

    devtool: 'cheap-source-map',

    devServer: {
        port: '9090',
        historyApiFallback: true
    },

    resolve: {
        cache: true,
        modulesDirectories: ['node_modules'],
        extensions: ['', '.ts', '.js', '.json'],
        alias: {
            'app': 'src/app'
        }
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['ts-loader', 'angular2-template-loader'],
                exclude: [/test/, /node_modules/]
            },
            {
                test: /\.(css|pcss)$/,
                exclude: root('src', 'app'),
                loader: ExtractTextPlugin.extract({fallbackLoader: 'style', loader: 'css!postcss?sourceMap'})
            },
            {
                test: /\.(css|pcss)$/,
                include: root('src', 'app'),
                loader: 'raw!postcss'
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url'
            },
            {
                test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file?mimetype=application/font-woff&name=[path][name].[ext]'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file?mimetype=application/x-font-ttf&name=[path][name].[ext]'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?\??$/,
                loader: 'file?mimetype=application/vnd.ms-fontobject&name=[path][name].[ext]'
            },
            {
                test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file?mimetype=application/font-otf&name=[path][name].[ext]'
            }
        ],
        noParse: [/.+zone\.js\/dist\/.+/, /.+angular2\/bundles\/.+/, /angular2-polyfills\.js/]
    },

    postcss()  {
        return [cssnext];
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunksSortMode: 'dependency'
        }),
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'polyfills']
        }),

        /*
         * Do type checking in a separate process, so webpack don't need to wait.
         * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
         */
        new ForkCheckerPlugin()
    ]
};

module.exports = config;

// Helper functions
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}

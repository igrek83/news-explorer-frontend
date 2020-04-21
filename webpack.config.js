const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: { 
        main: './src/bundle/index.js', 
        office: './src/bundle/office.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]/[name][chunkhash].js'
    },
    resolve: {
        alias: {
          src: path.resolve(__dirname, 'src/'),
          images: path.resolve(__dirname, 'src/images/'),
          vendor: path.resolve(__dirname, 'src/vendor/'),
        },
    },    
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.css$/,
            use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: '../' },
                    },
                'css-loader',
                'postcss-loader'],
        },
        {
            test: /\.(gif|png|jpe?g|ico|svg)$/i,
            use: [
                "file-loader?name=./images/[name].[hash].[ext]&publicPath=../",
                {
                    loader: 'image-webpack-loader',
                    options: {
                        bypassOnDebug: true,
                        disable: true,
                        mozjpeg: {
                            progressive: true,
                            quality: 85,
                          },
                          optipng: {
                            enabled: false,
                          },
                          pngquant: {
                            quality: [0.65, 0.9],
                            speed: 4,
                          },
                          gifsicle: {
                            interlaced: false,
                          },
                          webp: {
                            quality: 75,
                          },
                    },
                },
            ],
        },
        {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'file-loader?name=./vendor/fonts/[name].[ext]&publicPath=../',
        }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/pages/index.html',
            filename: './index.html',
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/pages/office-page/office.html',
            filename: './office/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name]/[name].[contenthash].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default'],
            },
            canPrint: true
        }),
        new WebpackMd5Hash(),
    ]
};

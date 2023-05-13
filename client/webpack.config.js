const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || 'development';

const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;


module.exports = {
    mode, 
    target,
    devtool,
    devServer: {
        port: 3003,
        https: true,
        open: true,
        hot: true,
        static: { 
            directory: path.resolve(__dirname, './public'), 
            publicPath: '/public'
          },
          historyApiFallback: true

    },
    entry: [ path.resolve(__dirname,  'src', 'index.js') ],
    
    output: {
        path : path.resolve(__dirname,  'dist'),
        clean : true,
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/[name][ext]'
    },

    plugins: [
        new HtmlWebpackPlugin( { 
            template: path.resolve(__dirname, 'src', 'index.html')
        }),    
        new MiniCssExtractPlugin( {
            filename: '[name].[contenthash].css'
        })
    ],

    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },            
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [require('postcss-preset-env')],
                            }
                        }
                    },
                    'sass-loader'
                ],
            },

            {
                test: /\.(ttf|woff|woff2)?$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]'
                }
            },
            {
                test: /\.(jpe?g|png|webp|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/img/[name][ext]'
                }
            }, 

            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    "presets": ["@babel/preset-env", "@babel/preset-react"]

                  }
                }
              }

        ],
        
    }

}

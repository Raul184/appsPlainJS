// 1 Entry point 
// 2 output 
// 3 loaders > import all kind of files && process them 
// 4 plugins > Complex processes on our src/input files

// -- nodeJS
const path = require('path');           // nodeJS

const HtmlWebpackPlugin = require('html-webpack-plugin'); // html injection-server template

// --

module.exports = {
    entry: ['@babel/polyfill', './src/js/app.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),                               //absolute path
        filename: 'app/bundle.js'
    },
    //local Server
    devServer: {
        contentBase: './dist'
    },
    //Plugins
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    //loaders
    module: {
        rules: [ //babel
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }, //SASS
            {
                test: /\.s?css/,
                use: [
                    "style-loader", //1
                    "css-loader",
                    "sass-loader"
                ]
            }, //IMG 
            {
                test: /\.(gif|png|jpe?g|svg)/i,
                use: [
                    "file-loader",
                    {
                        loader: "image-webpack-loader",
                        options: {
                            gifsicle: {
                                interland: false
                            },
                            optipng: {
                                optimizationLevel: 7
                            },
                            pngquant: {
                                quality: "65-90",
                                speed: 4
                            },
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            }
                        }
                    }
                ]
            }
        ]
    }
};

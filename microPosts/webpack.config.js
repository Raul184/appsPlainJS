// 1 Entry point 
// 2 output 
// 3 loaders > import all kind of files && process them 
// 4 plugins > Complex processes on our src/input files

// -- nodeJS
const path = require('path');           // nodeJS

const HtmlWebpackPlugin = require('html-webpack-plugin'); // html injection-server template

// --

module.exports = {
    entry: ['@babel/polyfill', './src/js/index.js', ],
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
        rules: [ //all of them
            {
                test: /\.js$/ ,
                exclude: /node_modules/ , 
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};

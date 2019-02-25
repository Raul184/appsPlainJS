//***Modes  >>   Development & Production mode  + efficient way  >> package.json

const path = require('path'); //built-in module for Absolute path on Output

const HtmlWebpackPlugin = require('html-webpack-plugin'); //HTML plugin


//export config-Obj so that Webpack can take it and work with.
module.exports = {
      //1. Entry point
      entry: './src/js/index.js',
      //2. Output point
      output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'js/bundle.js'
      },
      //LocalServer
      devServer:{ 
            contentBase: './dist/'  //line 9 script 
      },
      //4. Plugins  >> Complex processing of my input files
      plugins: [
            new HtmlWebpackPlugin({ //Inject it into LocalServer
                  filename: 'index.html',
                  template: './src/index.html'   
            })
      ]
};
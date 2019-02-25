const path = require('path'); //built-in module for Absolute path on Output

//export config-Obj so that Webpack can take it and work with.
module.exports = {
      //1. Entry point
      entry: './src/js/index.js',
      //2. Output point
      output: {
            path: path.resolve(__dirname, './dist/js'),
            filename: 'bundle.js'
      },
      //* Modes >> Development & Production mode 
      //mode: 'development' >>>     + efficient way  >> package.json
};
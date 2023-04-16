const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/public/js/index.mjs', // your TypeScript entry point
  output: {
    path: path.resolve(__dirname, 'dist/public/js'),
    filename: 'bundle.js',
  },
  mode: 'none'
};

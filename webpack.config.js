const path = require('path')

module.exports = {
  entry: './frontend/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist/frontend'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  devServer: {
    contentBase: './',
    publicPath: '/dist/frontend'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [path.resolve(__dirname, 'frontend')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  devtool: 'source-map',
  mode: process.env.BUILD_ENV === 'production' ? 'production' : 'development'
}

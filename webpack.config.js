const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname,'./dist'),
    filename: './js/main.js',
    publicPath: '/',
  },
  module:{
    rules: [
      {
        test: /\.(ts|tsx)/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'ts-loader',
          }
        ]
      },
      {
        test: /\.vue/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'vue-loader',
          }
        ]
      },
      {
        test: /\.js/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'babel-loader',
            options:{
              presets: [
                ['@babel/preset-env',{'targets':'>0.25%, not dead'}],
                '@babel/preset-react',
              ]
              
            }
          }
        ]
      },
      {
        test: /\.(css|sass|scss)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,              
            }
          },
          {
            loader: 'sass-loader',
          }
        ]
      },
      {
        
        test: /\.png|\.jpg|\.jpeg/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]'
        },
        use: [
          // {
          //   loader: 'file-loader',
          //   options: {
          //     esModule: false,
          //     name: 'img/[name].[ext]'
          //   }
          // }
          {
            loader: ('image-webpack-loader'),
            options: {
              mozjpeg:{
                progressive: true,
                quality: 65
              }
            }
          }
        ]
      },
      {
        test: /\.pug/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'pug-html-loader',
            options:{
              pretty: true
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: './css/main.css'
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/index.pug',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/access.pug',
      filename: 'access.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/members/taro.pug',
      filename: 'members/taro.html'
    }),
    new CleanWebpackPlugin(),
  ],
}
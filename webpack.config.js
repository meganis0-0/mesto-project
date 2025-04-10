const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: { main: './src/scripts/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/', // Важно для корректного разрешения путей в CSS и HTML
    assetModuleFilename: 'images/[name][ext]' // Универсальное правило для всех ассетов
  },
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Новый синтаксис для static
      watch: true, // Автоматическая перезагрузка при изменениях
    },
    compress: true,
    port: 8080,
    open: true,
    hot: true, // Включение Hot Module Replacement
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true // Кеширование для ускорения сборки
          }
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource', // Автоматическая обработка ресурсов
        generator: {
          filename: 'images/[name][ext]' // Сохранять в dist/images
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // Извлечение CSS в отдельный файл
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              esModule: false // Решение проблем с относительными путями
            }
          },
          'postcss-loader' // Постобработка CSS
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: { // Минификация HTML в production
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css' // Имя выходного CSS-файла
    }),
  ]
};
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const dotenv = require('dotenv');

// Загружаем .env файл
dotenv.config();

module.exports = {
  entry: './src/index.js',  // Начальная точка для сборки
  output: {
    path: path.resolve(__dirname, 'dist'),  // Папка для сборки
    filename: 'bundle.js',  // Имя выходного файла
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // Преобразует современный JS
          },
        },
      },
      {
        test: /\.css$/,  // Обработка CSS
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,  // Для обработки изображений
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]', // Используем хеш для избежания кеширования
              outputPath: 'assets/images', // Папка для изображений в финальной сборке
              publicPath: 'assets/images', // Путь, по которому доступна картинка
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),  // Очистка папки dist перед сборкой
    new HtmlWebpackPlugin({
      template: './src/index.html',  // Шаблон для HTML файла
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',  // Подача process как process/browser
    }),
    new webpack.DefinePlugin({
      'process.env.WEATHER_API_KEY': JSON.stringify(process.env.WEATHER_API_KEY),
    }),
  ],
  devServer: {  // Замените 'Server' на 'devServer'
    static: {
      directory: path.join(__dirname, 'dist'),  // Указываем папку для статических файлов
    },
    open: true,  // Открывать в браузере после запуска
    hot: true,  // Включить горячую перезагрузку (если нужно)
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src/'),  // Алиас для удобства импорта
    },
    fallback: {
      "buffer": require.resolve("buffer/"),
      "stream": require.resolve("stream-browserify"),
      "vm": require.resolve("vm-browserify"),
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "process": require.resolve("process/browser"),
    },
  },
};

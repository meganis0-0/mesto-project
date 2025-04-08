const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {main: './src/scripts/index.js'},
    output: {
        path: path.resolve(__dirname, 'dist'),    // путь к папке, где будет лежать собранный файл
        filename: 'main.js',                        // название собранного файла
            publicPath: '/'                         // путь к файлу на сервере
    },
    mode: 'development',
    devServer: {
        static: path.resolve(__dirname, './dist'),
        compress: true,
        port: 8080,

        open: true, 
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            // добавили правило для обработки файлов
            {
                // регулярное выражение, которое ищет все файлы с такими расширениями
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource'
            },     
            
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, {
                        loader: 'css-loader',

                        options: {
                            importLoaders: 1
                        }
                    },

                    'postcss-loader'
                ]

            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'       
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(
            {
                filename: 'style.css'
            }
        ),
    ]
}
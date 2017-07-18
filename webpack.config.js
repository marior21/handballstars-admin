const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const cssModules = 'modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]'

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx']
    },

    entry: ['./src/index.jsx'],
    output: {
        filename: 'app.js',
        path: '/build',
        publicPath: '/'
    },

    module: {
        loaders: [
            { test: /(\.js|jsx)$/, exclude: /node_modules/, loaders: ['babel-loader'] },
            { test: /\.css$/, loader: `style-loader!css-loader?${cssModules}` },
            { test: /\.jpe?g|png|gif|svg$/, loader: "file-loader?name=/[name].[ext]" }
        ]
    },

    devServer: {
        host: '0.0.0.0',
        port: 8080,
        inline: true
    },

    plugins: [
        new HtmlWebpackPlugin({ template: './src/assets/index.html' }),
        new ExtractTextPlugin({ filename: 'style.css', disable: false, allChunks: true })
    ]
}
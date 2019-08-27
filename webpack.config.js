var path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: {
        app: './index.js'
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        inline: true,
        host: '0.0.0.0',
        disableHostCheck: true,
        port: 9000,
        /*
        headers: {
            "Access-Control-Allow-Origin": "localhost:9000",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
            https: true
          }*/
    }
}
const path = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'xiangqi.js',
        library: 'Xiangqi',
        libraryTarget: 'umd',
        libraryExport:'default',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/,     
                use: 'awesome-typescript-loader'
            },        
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },   
    resolve: {
        extensions: [
            '.ts'
        ]
    },
    devtool: 'source-map'
};

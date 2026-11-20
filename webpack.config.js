const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Add this plugin

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
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
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif|svg|glb|gltf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets' }, // Copy all assets (including textures) to the 'dist/assets' directory
            ],
        }),
    ],
    devServer: {
        static: [
            {
                directory: path.resolve(__dirname, 'src'), // Serve the 'src' directory for index.html
                publicPath: '/',
            },
            {
                directory: path.resolve(__dirname, 'dist'), // Serve the 'dist' directory for bundle.js and assets
                publicPath: '/dist',
            },
        ],
        compress: true,
        port: 9000,
        open: true, // Automatically open the browser
    },
    resolve: {
        extensions: ['.js'],
    },
};
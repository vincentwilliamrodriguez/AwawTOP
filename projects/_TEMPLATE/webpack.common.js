const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
   entry: {
     app: './src/index.js',
   },
   plugins: [
     new HtmlWebpackPlugin({
       template: './src/index.html',
       filename: 'index.html',
       inject: 'head',
       scriptLoading: 'defer',
       favicon: './favicon.ico',
     }),
   ],
   module: {
     rules: [
       {
         test: /\.s[ac]ss$/i,
         use: [
           // Creates `style` nodes from JS strings
<<<<<<< HEAD
           'style-loader',
           // Translates CSS into CommonJS
           'css-loader',
           // Compiles Sass to CSS
           'sass-loader',
=======
           "style-loader",
           // Translates CSS into CommonJS
           "css-loader",
           // Compiles Sass to CSS
           "sass-loader",
>>>>>>> origin/feature/library-validation
         ],
       },
       {
         test: /\.(png|svg|jpg|jpeg|gif)$/i,
         type: 'asset/resource',
       },
       {
         test: /\.(woff|woff2|eot|ttf|otf)$/i,
         type: 'asset/resource',
       },
<<<<<<< HEAD
       {
         test: /\.(?:js|mjs|cjs)$/,
         exclude: /node_modules/,
         use: {
           loader: 'babel-loader',
           options: {
             presets: [['@babel/preset-env', { targets: 'defaults' }]],
           },
         },
       },
=======
>>>>>>> origin/feature/library-validation
     ],
   },
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
     assetModuleFilename: 'src/assets/images/[name].[ext]',
     clean: true,
   },
 };
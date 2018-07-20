const path = require('path');
const argv = require('yargs').argv;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = argv.mode === 'development';
const isProduction = !isDevelopment;
const distPath = path.join(__dirname, '/public');

const config = {
  entry: {
    main: './src/js/index.js'
  },
  output: {
    filename: './js/bundle.js',
    path: distPath
  },
  module: {
    rules: [{
      test: /\.html$/,
      use: 'html-loader'
    }, {
      test: /\.js$/,
      exclude:  path.join(process.cwd(), 'node_modules'),
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }]
    }, {
      test: /\.scss$/,
      exclude:  path.join(process.cwd(), 'node_modules'),
      use: [
        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            minimize: isProduction
          }
        },
        'sass-loader',
        'resolve-url-loader'
      ]
    }, {
      test: /\.(gif|png|jpe?g|svg)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'images/[name][hash].[ext]'
        }
      }, {
        loader: 'image-webpack-loader',
        options: {
          bypassOnDebug: true, // webpack@1.x
          disable: true, // webpack@2.x and newer
          mozjpeg: {
            progressive: true,
            quality: 70
          },
          optipng: {
            enabled: false,
          },
          pngquant: {
            quality: '65-90',
            speed: 4
          },
          gifsicle: {
            interlaced: false,
          },
          // the webp option will enable WEBP
          webp: {
            quality: 75
          }
        }
      },
      ],
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: 'fonts/[name][hash].[ext]'
        }
      },
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/blog.html',
      filename: './blog.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/contact.html',
      filename: './contact.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/about.html',
      filename: './about.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/landing.html',
      filename: './landing.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/products.html',
      filename: './products.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/test.html',
      filename: './test.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/flex01.html',
      filename: './flex01.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/flex02.html',
      filename: './flex02.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/flex03.html',
      filename: './flex03.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/flex04.html',
      filename: './flex04.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/flex05.html',
      filename: './flex05.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/flex06.html',
      filename: './flex06.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/flex07.html',
      filename: './flex07.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/flex08.html',
      filename: './flex08.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/flex09.html',
      filename: './flex09.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/flex10.html',
      filename: './flex10.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/flex11.html',
      filename: './flex11.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/grid01.html',
      filename: './grid01.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/grid02.html',
      filename: './grid02.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/grid03.html',
      filename: './grid03.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/grid04.html',
      filename: './grid04.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/grid05.html',
      filename: './grid05.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/grid06.html',
      filename: './grid06.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/grid07.html',
      filename: './grid07.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/grid08.html',
      filename: './grid08.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/grid09.html',
      filename: './grid09.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/grid10.html',
      filename: './grid10.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/grid11.html',
      filename: './grid11.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/grid12.html',
      filename: './grid12.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/grid13.html',
      filename: './grid13.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/grid14.html',
      filename: './grid14.html'
    })
    
  ],
  optimization: isProduction ? {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false,
            warnings: false,
            drop_console: true,
            unsafe: true
          },
        },
      }),
    ],
  } : {},
  devServer: {
    contentBase: distPath,
    port: 3000,
    compress: true,
    open: true
  }
};

module.exports = config;

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

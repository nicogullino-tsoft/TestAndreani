module.exports = [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components|public\/)/,
      loader: "babel-loader"
    },
    {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader?importLoaders=2']
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      exclude: /(node_modules|bower_components)/,
      loader: "file-loader"
    },
    {
      test: /\.(woff2|woff|woff3)$/,
      exclude: /(node_modules|bower_components)/,
      loader: "url-loader?prefix=font/&limit=5001"
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      exclude: /(node_modules|bower_components)/,
      loader: "url-loader?limit=10001&mimetype=application/octet-stream"
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      exclude: /(node_modules|bower_components)/,
      loader: "url-loader?limit=10001&mimetype=image/svg+xml"
    },
    {
      test: /\.gif/,
      exclude: /(node_modules|bower_components)/,
      loader: "url-loader?limit=10001&mimetype=image/gif"
    },
    {
      test: /\.jpg/,
      exclude: /(node_modules|bower_components)/,
      loader: "url-loader?limit=10001&mimetype=image/jpg"
    },
    {
      test: /\.png/,
      //exclude: /(node_modules|bower_components)/,
      loader: "url-loader?limit=10001&mimetype=image/png"
    },
  {
      test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
      loader: require.resolve("file-loader"),
      options: {
          name: "/static/media/[name].[hash:8].[ext]",
      },
  }
  ];
  
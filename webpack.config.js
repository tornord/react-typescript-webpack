const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const webpack = require("webpack");
// const pkg = require("./package.json");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = (env) => {
  const filename = env.production ? "index-library" : "index-demo";
  console.log(env, filename);
  return {
    mode: env.production ? "production" : "development",
    devtool: "inline-source-map",
    entry: {
      app: path.join(__dirname, "src", `${filename}.tsx`),
    },
    target: env.production ? "node" : "web",
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      fallback: {
        url: require.resolve("url/"),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: "/node_modules/",
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        // {
        //   test: /\.s[ac]ss$/i,
        //   use: ["style-loader", "css-loader" /*"postcss-loader" ,"resolve-url-loader"*/, "sass-loader"],
        // },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          exclude: /node_modules/,
          use: [
            "file-loader",
            {
              loader: "image-webpack-loader",
              options: {
                bypassOnDebug: true, // webpack@1.x
                disable: true, // webpack@2.x and newer
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2)$/,
          type: "asset/resource",
          generator: {
            filename: "./fonts/[name][ext]",
          },
        },
        // {
        //   test: /\.(woff|woff2)$/,
        //   use: {
        //     loader: "url-loader",
        //     options: {
        //       limit: 50000,
        //       mimetype: "font-woff",
        //       name: "./fonts/[name].[ext]", // Output below ./fonts
        //       publicPath: "../", // Take the directory into account
        //     },
        //   },
        // },
      ],
    },
    output: {
      clean: env.production ? true : false,
      filename: `${filename}.js`,
      // chunkFilename: `${filename}.js`,
      path: path.resolve(__dirname, env.production ? "dist" : "demo"),
      ...(env.production ? { library: { type: "commonjs" } } : {}),
    },
    plugins: [
      new HtmlWebpackPlugin({ template: path.join(__dirname, "src", "index.html") }),
      // new NodePolyfillPlugin(),
      // new webpack.ProvidePlugin({ process: "process/browser" }),
      // new MiniCssExtractPlugin(),
    ],
    devServer: {
      static: path.resolve(__dirname, "./demo"),
    },
    ...(env.production ? { externals: { react: "commonjs react" } } : {}),
  };
};

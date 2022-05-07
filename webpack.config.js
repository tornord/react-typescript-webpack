const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = (env) => {
  const filename = env.production ? "index-library.tsx" : "index-demo.tsx";
  console.log(env, nodeExternals());
  return {
    mode: env.production ? "production" : "development",
    devtool: "inline-source-map",
    entry: {
      app: path.join(__dirname, "src", filename),
    },
    target: env.production ? "node" : "web",
    // externalsPresets: { node: true },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.(txt|csv)$/i,
          use: "raw-loader",
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: "/node_modules/",
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            "style-loader", // Creates `style` nodes from JS strings
            {
              loader: "css-loader",
              options: {
                sourceMap: true, // <-- !!IMPORTANT!!
              },
            },
            // "resolve-url-loader",
            // {
            //   loader: "postcss-loader",
            //   options: {
            //     sourceMap: true, // <-- !!IMPORTANT!!
            //   },
            // },
            // Compiles Sass to CSS
            {
              loader: "sass-loader",
              options: {
                sourceMap: true, // <-- !!IMPORTANT!!
              },
            },
          ],
        },
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
          use: [
            {
              loader: "file-loader",
              options: {
                name: "fonts/[hash].[ext]",
                mimetype: "font/woff",
              },
            },
          ],
        },
      ],
    },
    output: {
      filename: filename,
      chunkFilename: filename,
      path: path.resolve(__dirname, env.production ? "dist" : "demo"),
    },
    plugins: [
      new HtmlWebpackPlugin({ template: path.join(__dirname, "src", "index.html") }),
      new webpack.ProvidePlugin({ process: "process/browser" }),
    ],
    optimization: {
      // minimize: true,
      usedExports: true,
    },
    externals: env.production ? [nodeExternals()] : [],
  };
};

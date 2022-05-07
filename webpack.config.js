const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
// const pkg = require("./package.json");

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
          type: "asset/resource",
          // use: [
          //   {
          //     loader: "file-loader",
          //     options: {
          //       name: "fonts/[hash].[ext]",
          //       mimetype: "font/woff",
          //     },
          //   },
          // ],
        },
      ],
    },
    output: {
      clean: env.production ? true : false,
      filename: `${filename}.js`,
      chunkFilename: `${filename}.js`,
      path: path.resolve(__dirname, env.production ? "dist" : "demo"),
      ...(env.production ? { library: { type: "commonjs" } } : {}),
    },
    plugins: [
      new HtmlWebpackPlugin({ template: path.join(__dirname, "src", "index.html") }),
      new webpack.ProvidePlugin({ process: "process/browser" }),
    ],
    devServer: {
      static: path.resolve(__dirname, "./demo"),
    },
    ...(env.production ? { externals: { react: "commonjs react" } } : {}),
  };
};

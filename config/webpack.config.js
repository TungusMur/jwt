const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

const babelLoader = (preset) => {
  const loader = {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"],
    },
  };

  if (preset) {
    loader.options.presets.push(...preset);
  }

  return loader;
};

const styleLoader = (loaders) => {
  const loader = ["style-loader", "css-loader"];

  if (loaders) {
    loader.push(...loaders);
  }

  return loader;
};

module.exports = {
  mode: isDev ? "development" : "production",
  entry: ["@babel/polyfill", path.resolve(__dirname, "../src") + "/index.tsx"],
  output: {
    filename: "[name].[contenthash].js",
    clean: true,
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 3300,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: styleLoader(),
      },
      {
        test: /\.s[ac]ss$/,
        use: styleLoader(["sass-loader"]),
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: babelLoader([
          ["@babel/preset-react", { runtime: "automatic" }],
          "@babel/preset-typescript",
        ]),
      },
      {
        test: /\.m?ts$/,
        exclude: /node_modules/,
        use: babelLoader(["@babel/preset-typescript"]),
      },
    ],
  },
  devtool: isDev ? "inline-source-map" : "source-map",
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "../src") + "/index.html",
      filename: "index.html",
    }),
  ],
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".tsx", "..."],
    alias: {
      pages: path.resolve(__dirname, "../src/pages"),
      processes: path.resolve(__dirname, "../src/processes"),
      widgets: path.resolve(__dirname, "../src/widgets"),
      shared: path.resolve(__dirname, "../src/shared"),
      features: path.resolve(__dirname, "../src/features"),
      app: path.resolve(__dirname, "../src/app"),
    },
  },
};

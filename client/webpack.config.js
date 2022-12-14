const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");
const getProxyConfig = require("./proxy.config");
const TerserPlugin = require("terser-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env) => {
  try {
    const dotenvConfig = dotenv.config({ path: "../.env" });

    if (dotenvConfig.error) {
      throw new Error(`Error while parsing .env config: ${dotenvConfig.error}`);
    }

    if (!process.env.CLIENT_PORT) {
      throw new Error(`.env file doesn't include CLIENT_PORT variable`);
    }

    if (!process.env.SERVER_PORT) {
      throw new Error(`.env file doesn't include SERVER_PORT variable`);
    }

    if (!process.env.SERVER_LINK) {
      throw new Error(`.env file doesn't include SERVER_LINK variable`);
    }

    if (!process.env.USE_MOCKS) {
      throw new Error(`.env file doesn't include USE_MOCKS variable`);
    }

    const mode = env.development ? "development" : env.production ? "production" : undefined;
    if (!mode) {
      throw new Error("Environment mode is undefined");
    }

    const isProduction = mode === "production";
    const isDevelopment = mode === "development";

    const productionPostfix = isProduction ? ".[contenthash]" : "";

    return {
      mode,

      entry: "./src/index",
      output: {
        filename: `[name].bundle${productionPostfix}.js`,
        chunkFilename: `[id].chunk${productionPostfix}.js`,
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
      },

      resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        alias: {
          "@ts": path.resolve(__dirname, "ts"),
          "@client": path.resolve(__dirname, "src"),
          "@common": path.resolve(__dirname, "src", "common"),
          "@localization": path.resolve(__dirname, "src", "common", "localization"),
          "@components": path.resolve(__dirname, "src", "components"),
          "@containers": path.resolve(__dirname, "src", "containers"),
          "@icons": path.resolve(__dirname, "src", "icons"),
        },
      },

      devtool: isDevelopment ? "source-map" : undefined,
      devServer: {
        port: process.env.CLIENT_PORT,
        hot: true,
        compress: true,
        client: {
          overlay: true,
          progress: true,
        },
        historyApiFallback: true,
        proxy: getProxyConfig(process.env.SERVER_LINK),
        static : {
          directory: path.resolve(__dirname, "public", "assets"),
          publicPath: "/assets"
        },
      },

      optimization: {
        minimize: isProduction,
        minimizer: [
          new TerserPlugin({
            parallel: true,
            extractComments: false,
          }),
        ],
        splitChunks: {
          chunks: "all",
          automaticNameDelimiter: "-",
          maxInitialRequests: Infinity,
          cacheGroups: {
            vendors: {
              priority: 1,
              reuseExistingChunk: true,
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
            },
            default: false,
          },
        },
      },

      plugins: [
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
          template: "./public/index.html",
        }),
        new CircularDependencyPlugin({
          exclude: /node_modules/,
          include: /[\\/]src[\\/]/,
          failOnError: true,
          allowAsyncCycles: false,
        }),
        new webpack.DefinePlugin({
          "process.env.SERVER_LINK": `"${process.env.SERVER_LINK}"`,
          "process.env.USE_MOCKS": process.env.USE_MOCKS === "true",
        }),
      ],

      module: {
        rules: [
          {
            use: ["style-loader", "css-loader"],
            test: /\.css$/,
          },
          {
            test: /\.m?(ts|tsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
              },
            },
          },
        ],
      },
    };
  } catch (error) {
    console.log(`[WEBPACK ERROR]`, error);
    process.exit();
  }
};

/** @format */

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

module.exports = {
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: true,
                cache: false,
            }),
        ],
    },
    entry: {
        index: "./src/sandbox.js",
        recupero: "./src/recupero.js",
        ayuda: "./src/ayuda.js",
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "Titulo",
            template: "./src/index.html",
            filename: "index.html",
            chunks: ["index"],
            favicon: "./assets/icons/favicon.ico",
        }),
        new HtmlWebpackPlugin({
            title: "Recupero",
            template: "./src/recupero.html",
            filename: "recupero.html",
            chunks: ["recupero"],
            favicon: "./assets/icons/favicon.ico",
        }),
        new HtmlWebpackPlugin({
            title: "Ayuda",
            template: "./src/ayuda.html",
            filename: "ayuda.html",
            chunks: ["ayuda"],
            favicon: "./assets/icons/favicon.ico",
        }),
        new WebpackPwaManifest({
            name: "Integracion",
            short_name: "Integracion",
            description: "",
            start_url: "./index.html",
            background_color: "#ffffff",
            display: "standalone",
            scope: "./",
            theme_color: "#ffffff",
            orientation: "portrait",
            fingerprints: false,
            icons: [
                {
                    src: path.resolve("assets/icons/ic_launcher.png"),
                    sizes: "192x192",
                },
                {
                    src: path.resolve("assets/icons/playstore-icon.png"),
                    size: "512x512",
                },
            ],
        }),

        new webpack.DefinePlugin({
            __VERSION__: JSON.stringify(process.env.npm_package_version),
            __DESCRIPTION__: JSON.stringify(process.env.npm_package_description),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"],
            },
            {
                test: /\.(woff|ttf|woff2)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 50000,
                    },
                },
            },
        ],
    },
};

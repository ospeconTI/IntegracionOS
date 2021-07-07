/** @format */

const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const webpack = require("webpack");

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "var",
        library: "EntryPoint",
        publicPath: "/",
    },
    plugins: [
        new webpack.DefinePlugin({
            SERVICE_URL: JSON.stringify("http://200.80.227.180/promocionsocial"),
            SERVICE_URL: JSON.stringify("http://localhost/promocionsocial"),
            ID_TIPO_DOCUMENTO_FACTURA: JSON.stringify("7"),
            ESTADO_FACTURA_PRESENTADA: JSON.stringify("2"),
            ESTADO_FACTURA_RECHAZADA: JSON.stringify("7"),
        }),
    ],
});

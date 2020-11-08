const path = require("path");

module.exports = {
    entry: [
        "./js/load.js",
        "./js/upload.js",
        "./js/form.js",
        "./js/filters.js",
        "./js/pins.js",
        "./js/card.js",
        "./js/page.js"
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname),
        iife: true
    },
    devtool: false
};
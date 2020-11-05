const path = require("path");

module.exports = {
    entry: [
        "./js/card.js",
        "./js/filters.js",
        "./js/form.js",
        "./js/load.js",
        "./js/page.js",
        "./js/pins.js",
        "./js/upload.js"
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname),
        iife: true
    },
    devtool: false
};
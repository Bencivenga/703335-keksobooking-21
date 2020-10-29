const path = require("path");

module.exports = {
  entry: [
    "./js/backend.js",
    "./js/util.js",
    "./js/validation.js",
    "./js/main-pin.js",
    "./js/card.js",
    "./js/pin-ad.js",
    "./js/debounce.js",
    "./js/upload-image.js",
    "./js/map-filtering.js",
    "./js/drag-n-drop.js",
    "./js/main.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};


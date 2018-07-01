module.exports = {
  dev: {
    mode: "development",
    output: {
      filename: "app.js"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          // exclude: /(node_modules)/,
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      ]
    }
  },
  prod: {
    mode: "production",
    output: {
      filename: "app.js"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          // exclude: /(node_modules)/,
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      ]
    }
  }
}

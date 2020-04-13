// vue.config.js
module.exports = {
    devServer: {
        // proxy: 'http://93.115.96.122',
        // proxy: 'http://127.0.0.1:3000'
        proxy: {
            "/": {
                target: 'http://localhost:3000/',
                ws: true
            },
        }
    }
  }

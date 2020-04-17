module.exports = {
    publicPath: './',
    devServer: {
        host: "0.0.0.0",
        port: 8080,
        proxy: {
            '/stweather/proxy/172.22.68.182:8667': {
                target: 'http://172.22.68.182:8667',
                pathRewrite: {
                    '/stweather/proxy/172.22.68.182:8667': ''
                },
                changeOrigin: true
            },
            '/stweather/proxy/172.22.68.119:8667': {
                target: 'http://172.22.68.119:8667',
                pathRewrite: {
                    '/stweather/proxy/172.22.68.119:8667': ''
                },
                changeOrigin: true
            },

        }
    }
};
const PROXY_CONFIG = [
    {
        context: ['/api'],
        target: 'https://helpdesk-backend-prod.herokuapp.com',
        secure: false,
        loglevel: 'debug',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
    }
];

module.exports = PROXY_CONFIG;
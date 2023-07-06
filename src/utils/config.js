module.exports = {
    enviroment: process.env.ENV || 'develop',
    frameworks: {
        web: {
            express: {
                port: process.env.EXPRESS_PORT || 3000
            }
        }
    }
};
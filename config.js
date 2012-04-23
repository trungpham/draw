var Config = {

    production: {
        facebook: {
            appId: '389721667734807',
            appSecret: '38ffdef9914432d157abea7bf1d7c97c'
        }
    },

    development: {
        facebook: {
            appId: '277432858998638',
            appSecret: 'ec0cdab9737863a8da27d45976abb76f'
        }
    }

};


module.exports = Config[process.env.NODE_ENV || 'development'];
module.exports = {
    transpileDependencies:  ['vuetify', 'dotenv'],
    pluginOptions: {

    },
    publicPath: process.env.NODE_ENV === 'production'
    ? '/monstergame/'
    : '/',
 
  }
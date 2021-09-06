const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Getir Case Study',
    version,
  },
  servers: [
    {
      url: config.env !== 'production' ? `http://localhost:${config.port}/v1` : `https://getir-dp.herokuapp.com/v1`,
    },
  ],
};

module.exports = swaggerDef;

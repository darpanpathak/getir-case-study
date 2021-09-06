const Joi = require('joi');

const getRecords = {
  body: Joi.object().keys({
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().greater(Joi.ref('startDate')).required(),
    minCount: Joi.number().required(),
    maxCount: Joi.number().min(Joi.ref('minCount')).required(),
  }),
};

module.exports = {
  getRecords,
};

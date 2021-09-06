const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const recordsSchema = mongoose.Schema({
  key: {
    type: String,
    required: true,
    trim: true,
  },
  value: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  counts: {
    type: [String],
    default: [],
  },
});

// add plugin that converts mongoose to json
recordsSchema.plugin(toJSON);

const Records = mongoose.model('records', recordsSchema);

module.exports = Records;

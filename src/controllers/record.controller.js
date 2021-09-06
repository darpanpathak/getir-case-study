const { recordService } = require('../services');

const catchAsync = require('../utils/catchAsync');

const getRecords = catchAsync(async (req, res) => {
  const result = await recordService.queryRecords(req);
  res.send({
    code: 0,
    msg: 'Success',
    records: result,
  });
});

module.exports = {
  getRecords,
};

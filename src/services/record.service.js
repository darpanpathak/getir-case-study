const { Records } = require('../models');

const queryRecords = async (req) => {
  const { startDate, endDate, minCount, maxCount } = req.body;

  const query = Records.aggregate()
    .match({
      createdAt: { $gt: new Date(startDate), $lt: new Date(endDate) },
    })
    .project({ _id: 0, key: 1, createdAt: 1, totalCount: { $sum: '$counts' } })
    .match({
      totalCount: { $gt: minCount, $lt: maxCount },
    });

  const records = query.exec();
  return records;
};

module.exports = {
  queryRecords,
};

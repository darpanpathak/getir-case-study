const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');

setupTestDB();

describe('Records routes', () => {
  describe('POST /v1/records', () => {
    let recordRequest;

    beforeEach(() => {
      recordRequest = {
        startDate: '2016-02-01',
        endDate: '2018-02-02',
        minCount: 2800,
        maxCount: 2820,
      };
    });

    test('should return 200 with valid records', async () => {
      await request(app)
        .post('/v1/records')
        .send(recordRequest)
        .expect(httpStatus.OK, {
          code: 0,
          msg: 'Success',
          records: [
            {
              key: 'kzSqsBrJ',
              createdAt: '2016-12-02T15:07:30.465Z',
              totalCount: 2803,
            },
          ],
        });
    });

    test('should return 400 error if startDate is not present', async () => {
      const req = { ...recordRequest, startDate: '' };

      await request(app).post('/v1/records').send(req).expect(httpStatus.BAD_REQUEST, {
        code: 400,
        msg: '"startDate" must be in ISO 8601 date format, "endDate" date references "ref:startDate" which must have a valid date format',
      });
    });

    test('should return 400 error if endDate is not present', async () => {
      const req = { ...recordRequest, endDate: '' };

      await request(app).post('/v1/records').send(req).expect(httpStatus.BAD_REQUEST, {
        code: 400,
        msg: '"endDate" must be in ISO 8601 date format',
      });
    });

    test('should return 400 error if startDate is after endDate', async () => {
      const req = { ...recordRequest, startDate: '2019-01-01' };

      await request(app).post('/v1/records').send(req).expect(httpStatus.BAD_REQUEST, {
        code: 400,
        msg: '"endDate" must be greater than "ref:startDate"',
      });
    });

    test('should return 400 error if minCount is not present', async () => {
      const req = { ...recordRequest, minCount: '' };

      await request(app).post('/v1/records').send(req).expect(httpStatus.BAD_REQUEST, {
        code: 400,
        msg: '"minCount" must be a number, "maxCount" limit references "ref:minCount" which must be a number',
      });
    });

    test('should return 400 error if maxCount is not present', async () => {
      const req = { ...recordRequest, maxCount: '' };

      await request(app).post('/v1/records').send(req).expect(httpStatus.BAD_REQUEST, {
        code: 400,
        msg: '"maxCount" must be a number',
      });
    });

    test('should return 400 error if maxCount is lesser than min count', async () => {
      const req = { ...recordRequest, maxCount: 2000 };

      await request(app).post('/v1/records').send(req).expect(httpStatus.BAD_REQUEST, {
        code: 400,
        msg: '"maxCount" must be greater than or equal to ref:minCount',
      });
    });
  });
});

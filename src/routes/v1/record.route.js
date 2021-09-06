const express = require('express');
const validate = require('../../middlewares/validate');
const recordValidation = require('../../validations/record.validation');
const { recordController } = require('../../controllers');

const router = express.Router();

router.route('/').post(validate(recordValidation.getRecords), recordController.getRecords);

module.exports = router;

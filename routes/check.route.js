const express = require('express');
const router = express.Router();
// const { errorSites } = require('../controllers/status.controller');

const { validateData } = require('../middlewares/validateData');
const {
  checkURLs,
  getErrorUrlsUpdate,
  getErrorUrlsToday,
} = require('../controllers/check.controller');

// const { testCtrl } = require('../controllers/test.controller');
// const { uploadFile } = require('../helpers/multer');

// router.route('/test-speed').get(testCtrl);
router.route('/today').get(getErrorUrlsToday);
router.route('/check').post(validateData, checkURLs);
router.route('/update').get(getErrorUrlsUpdate);

module.exports = router;

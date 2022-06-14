const { checkData } = require('../utils/checkData');
const UrlService = require('../services/url.services');

exports.checkURLs = async (req, res, next) => {
  try {
    const { checkList } = req.body;

    const data = await checkData(checkList, true);

    await UrlService.update(data);

    res.status(200).json({ msg: 'hello' });
  } catch (err) {
    next(err);
  }
};

exports.getErrorUrlsToday = async (req, res, next) => {
  try {
    const errors = await UrlService.getErrorUrlsToday();
    // console.log(errors);
    res.status(200).json(errors);
  } catch (err) {
    next(err);
  }
};

exports.getErrorUrlsUpdate = async (req, res, next) => {
  try {
    const errors = await UrlService.getErrorUrlsUpdate();

    res.status(200).json(errors);
  } catch (err) {
    next(err);
  }
};

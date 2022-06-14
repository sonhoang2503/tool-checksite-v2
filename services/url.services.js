const moment = require('moment');
const Url = require('../models/url');
const UrlError = require('../models/error');
const UrlError_update = require('../models/error.update');

exports.update = async (data) => {
  try {
    const raw = data.map((item) => item.value);
    const url = raw.map((item) => {
      return { url: item.url };
    });
    const errors = raw
      .filter((item) => item.status !== 200)
      .map((item) => {
        return { url: item.url, status: item.status };
      });

    await createUniqueUrls(Url, url);
    await createUniqueUrls(UrlError_update, errors, true);
    await createUniqueUrls(UrlError, errors, true);
  } catch (err) {
    throw err;
  }
};

exports.updateErrorList = async (errors) => {
  try {
    await UrlError_update.deleteMany();
    await createUniqueUrls(UrlError_update, errors, true);
    await createUniqueUrls(UrlError, errors, true);
    console.log('Updated successfully');
  } catch (err) {
    throw err;
  }
};

exports.getUrls = async () => {
  try {
    const urls = await Url.find({});

    return urls;
  } catch (err) {
    throw err;
  }
};

exports.getErrorUrlsToday = async () => {
  try {
    const start = moment().startOf('day').toDate();
    const end = moment().endOf('day').toDate();

    const errors = await UrlError.find({
      created: {
        $gte: start,
        $lt: end,
      },
    });

    return errors;
  } catch (err) {
    throw err;
  }
};

exports.getErrorUrlsUpdate = async () => {
  try {
    const start = moment().startOf('day').toDate();
    const end = moment().endOf('day').toDate();
    const errors = await UrlError_update.find({
      created: {
        $gte: start,
        $lt: end,
      },
    });

    return errors;
  } catch (err) {
    throw err;
  }
};

const createUniqueUrls = async (model, errors, option = false) => {
  try {
    let option;
    if (option === true) {
      const start = moment().startOf('day').toDate();
      const end = moment().endOf('day').toDate();
      option = {
        created: {
          $gte: start,
          $lt: end,
        },
      };
    } else {
      option = {};
    }

    const existedError = await model.find(option);
    const existedUrl = existedError.map((item) => item.url);

    const newError = errors
      .map((item) => item.url)
      .filter((url) => !existedUrl.includes(url))
      .map((url) => {
        return { url: url };
      });
    await model.create(newError);
  } catch (err) {
    throw err;
  }
};

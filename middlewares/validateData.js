const isUrl = require('is-valid-http-url');

exports.validateData = async (req, res, next) => {
  const { list } = req.body;

  const checkList = list.filter((url) => isUrl(url));
  req.body.checkList = checkList;
  next();
};

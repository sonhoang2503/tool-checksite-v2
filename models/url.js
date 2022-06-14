const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
});

const Url = mongoose.model('Urls', UrlSchema);
module.exports = Url;

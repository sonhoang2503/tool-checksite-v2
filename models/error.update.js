const mongoose = require('mongoose');

const ErrorUpdateSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  status: Number,
  created: {
    type: Date,
    default: Date.now(),
  },
});

const ErrorURL_update = mongoose.model('UrlsErrorUpdate', ErrorUpdateSchema);
module.exports = ErrorURL_update;

const mongoose = require('mongoose');

const reviewPhotosSchema = mongoose.Schema({
  id: Number,
  review_id: Number,
  url: String,
});

module.exports = reviewPhotosSchema;
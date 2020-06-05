const mongoose = require("mongoose");

const reviewsSchema = mongoose.Schema({
  review_id: Number,
  product_id: Number,
  rating: Number,
  date: Date,
  summary: String,
  body: String,
  recommend: Number,
  reported: Number,
  reviewer_name: String,
  reviewer_email: String,
  response: String,
  helpfulness: Number,
});

module.exports = reviewsSchema;

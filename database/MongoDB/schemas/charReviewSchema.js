const mongoose = require("mongoose");

const charReviewSchema = mongoose.Schema({
  id: Number,
  characteristic_id: Number,
  review_id: Number,
  value: Number,
});

module.exports = charReviewSchema;

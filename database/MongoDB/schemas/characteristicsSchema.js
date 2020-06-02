const mongoose = require("mongoose");

const characteristicsSchema = mongoose.Schema({
  id: Number,
  product_id: Number,
  name: String,
});

module.exports = characteristicsSchema;

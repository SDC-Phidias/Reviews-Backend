const mongoose = require("mongoose");
1;
mongoose.connect("mongodb://localhost/Reviews", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// Build Schemas
const reviewPhotosSchema = mongoose.Schema({
  id: Number,
  review_id: Number,
  url: String,
});

const reviewsSchema = mongoose.Schema({
  review_id: Number,
  product_id: Number,
  rating: Number,
  date: Date,
  summary: String,
  body: String,
  recommend: String,
  reported: String,
  reviewer_name: String,
  reviewer_email: String,
  helpfulness: Number,
});

const characteristicsSchema = mongoose.Schema({
  id: Number,
  product_id: Number,
  name: String,
});

const charReviewSchema = mongoose.Schema({
  id: Number,
  characteristic_id: Number,
  review_id: Number,
  value: Number,
});

// Create a models
const Reviews = mongoose.model("Reviews", reviewsSchema, "reviews");
const CharReview = mongoose.model(
  "Characteristics",
  charReviewSchema,
  "characteristic_reviews"
);
const Photos = mongoose.model("Photos", reviewPhotosSchema, "reviews_photos");
const Characteristics = mongoose.model(
  "CharRevies",
  characteristicsSchema,
  "characteristics"
);

// Export
module.exports = {
  Reviews,
  Photos,
  CharReview,
  Characteristics,
};

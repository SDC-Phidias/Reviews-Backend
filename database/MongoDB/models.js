const mongoose = require("mongoose");
const reviewPhotosSchema = require("./schemas/photoSchema");
const reviewsSchema = require("./schemas/reviewSchema");
const charReviewSchema = require("./schemas/charReviewSchema");
const characteristicsSchema = require("./schemas/characteristicsSchema");
const db = require("./index");

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

module.exports = {
  Reviews,
  Photos,
  CharReview,
  Characteristics,
};

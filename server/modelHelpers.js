const {
  Reviews,
  Photos,
  CharReview,
  Characteristics,
} = require("../database/MongoDB/models");

// gets the last document and increments 1 for a new review id
const getNewReviewID = () => {
  return Reviews.aggregate([
    {
      $sort: {
        _id: -1,
      },
    },
    {
      $limit: 1,
    },
  ])
    .exec()
    .then((results) => {
      return results[0].review_id;
    })
    .catch((err) => {
      return err;
    });
};

const getNewCharID = () => {
  return CharReview.aggregate([
    {
      $sort: {
        _id: -1,
      },
    },
    {
      $limit: 1,
    },
  ])
    .exec()
    .then((results) => {
      console.log(results);
      return {
        char_id: results[0].characteristic_id,
        id: results[0].id,
      };
    })
    .catch((err) => {
      console.error(err);
    });
};

const getNewPhotoID = () => {
  Photos.aggregate([
    {
      $sort: {
        _id: -1,
      },
    },
    {
      $limit: 1,
    },
  ])
    .exec()
    .then((results) => {
      return results[0].id;
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  getNewCharID,
  getNewReviewID,
  getNewPhotoID,
};

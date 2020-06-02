const {
  Reviews,
  Photos,
  CharReview,
  Characteristics,
} = require("../database/MongoDB/models");

const retrieveReviews = async (productID, page, count, sort) => {
  let queryResult = {};
  let promised = [];
  return Reviews.find(
    { product_id: productID, reported: 0 },
    { _id: 0, product_id: 0 }
  )
    .limit(count)
    .sort()
    .lean()
    .exec()
    .then((results) => {
      console.log(results);
      queryResult.product_id = productID;
      queryResult.page = page;
      queryResult.count = count;
      queryResult.results = results;
      return queryResult;
    })
    .catch((err) => console.error(err))
    .then((qResults) => {
      qResults.results.map(async (ele) => {
        promised.push(retrievePhotos(ele.review_id));
      });
    })
    .catch((err) => console.error(err))
    .then(() => {
      return Promise.all(promised);
    })
    .catch((err) => console.error(err))
    .then((results) => {
      queryResult.results.map((ele, i) => {
        ele.photos = results[i];
      });
      return queryResult;
    })
    .catch((err) => console.error(err));
};

const retrievePhotos = (reviewID) => {
  return Photos.find({ review_id: reviewID }, { _id: 0, review_id: 0 })
    .lean()
    .exec()
    .then((results) => {
      return results;
    });
};

const retrieveMeta = (productID) => {};

const update = (param, model, options) => {
  let updateQuery = { $set: { helpfulness: helpfulness } };
  return Review.findByIdAndUpdate(param_id, updateQuery, options).exec();
};
const saveReview = (params) => {
  return reviewsInstance.save();
};

const updateHelpful = (reviewID = {});

module.exports = {
  saveReview,
  retrieveReviews,
  retrieveMeta,
  update,
  retrievePhotos,
};

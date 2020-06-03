const {
  Reviews,
  Photos,
  CharReview,
  Characteristics,
} = require("../database/MongoDB/models");
const {
  getRecommendCounts,
  getRatingsCounts,
  mapValueToObj,
  formatData,
} = require("./helper");

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
    })
    .catch((err) => console.error(err));
};

const retrieveMeta = (productID) => {
  let queryResult = {};
  return Reviews.aggregate([
    {
      $match: {
        product_id: parseInt(productID),
      },
    },
    {
      $group: {
        _id: "$product_id",
        recommend: {
          $push: "$recommend",
        },
        rating: {
          $push: "$rating",
        },
      },
    },
  ])
    .exec()
    .then((results) => {
      let recommend = getRecommendCounts(results);
      let rating = getRatingsCounts(results);
      queryResult = {
        product_id: productID,
        ratings: rating,
        recommended: recommend,
      };
    })
    .catch((err) => {
      console.error(err)
    })
    .then(() => {
      return getCharacteristics(productID);
    })
    .then((results) => {
      let characteristics = formatData(results[0].characteristics);
      queryResult.characteristics = characteristics;
      return queryResult;
    })
    .catch(() => {
      queryResult.characteristics = {};
      return queryResult;
    })
};

const getCharacteristics = async (productID) => {
  let promised = [];
  let characterQResults = {};
  return Characteristics.aggregate([
    {
      $match: {
        product_id: parseInt(productID),
      },
    },
    {
      $group: {
        _id: "$product_id",
        characteristics: {
          $push: {
            id: "$id",
            name: "$name",
          },
        },
      },
    },
  ])
    .exec()
    .then((queryResults) => {
      characterQResults.characteristics = queryResults;
      queryResults[0].characteristics.map(async (ele, i) => {
        let id = parseInt(ele.id);
        promised.push(getAvgValue(id));
      });
    })
    .catch(() => {
      characterQResults.characteristics = {
      };
    })
    .then(() => {
      return Promise.all(promised);
    })
    .catch((err) => console.error(err))
    .then((results) => {
      return mapValueToObj(results, characterQResults.characteristics)
    })
    .catch((err) => console.error(err));
};

const getAvgValue = (charID) => {
  return CharReview.aggregate([
    {
      $match: {
        characteristic_id: parseInt(charID),
      },
    },
    {
      $group: {
        _id: "$characteristic_id",
        value: {
          $push: "$value",
        },
        avg: {
          $avg: "$value",
        },
      },
    },
  ])
    .exec()
    .then((results) => {
      let charReviewObj = {
        id: results[0]._id,
        value: results[0].avg,
      };
      return charReviewObj;
    })
    .catch((err) => {console.error(err)});
};
const update = (param, options) => {
  let updateQuery = { $set: { helpfulness: param.helpfulness } };
  return Review.findByIdAndUpdate(param_id, updateQuery, options).exec();
};
const addReview = (params) => {
  let reviewsInstance = new Reviews({
    review_id: params.review_id,
    product_id: params.product_id,
    rating: params.rating,
    date: params.date || Date.now(),
    summary: params.summary,
    body: params.body,
    recommend: Number(params.recommend) || 0,
    reported: 0,
    reviwer_name: params.reviewer_name,
    reviwer_email: params.reviewer_email,
    helpfulness: Number(params.helpfulness) || 0,
  });
  let photoInstance = new Photos({
    id: params,
    review_id: reviewID,
    url: params.photo,
  });
  return Promise.all(reviewsInstance.save(), photoInstance.save());
};

const updateHelpful = (reviewID = {});

module.exports = {
  addReview,
  retrieveReviews,
  retrieveMeta,
  update,
  retrievePhotos,
};

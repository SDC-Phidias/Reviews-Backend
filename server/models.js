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
  getAvg,
} = require("./helper");

const retrieveReviews = (productID, page, count, sort) => {
  sort = sort;
  return Reviews.aggregate([
    {
      $match: {
        product_id: parseInt(productID),
        reported: 0,
      },
    },
    {
      $lookup: {
        from: "reviews_photos",
        localField: "review_id",
        foreignField: "review_id",
        as: "photos",
      },
    },
    {
      $limit: parseInt(count),
    },
    {
      $sort: {
        sort: -1,
      },
    },
    {
      $project: {
        _id: 0,
        reported: 0,
        product_id: 0,
        "photos._id": 0,
      },
    },
  ])
    .exec()
    .then((results) => {
      let queryResults = {
        product: productID,
        page: page,
        count: count,
        results: results,
      };
      return queryResults;
    })
    .catch((err) => {
      console.error(err);
      queryResult = {
        product_id: productID,
        page: 0,
        count: 0,
        results: [],
      };
      return queryResult;
    });
};

const retrieveMeta = (productID) => {
  return Characteristics.aggregate([
    {
      $match: {
        product_id: parseInt(productID),
      },
    },
    {
      $lookup: {
        from: "reviews",
        localField: "product_id",
        foreignField: "product_id",
        as: "results",
      },
    },
    {
      $lookup: {
        from: "characteristic_reviews",
        localField: "id",
        foreignField: "characteristic_id",
        as: "characteristics",
      },
    },
    {
      $group: {
        _id: "$id",
        ratings: {
          $push: "$results.rating",
        },
        recommended: {
          $push: "$results.recommend",
        },
        characteristics: {
          $push: {
            id: "$characteristics.characteristic_id",
            name: "$name",
            values: {
              valueArr: "$characteristics.value",
            },
          },
        },
      },
    },
  ])
    .exec()
    .then((results) => {
      let queryResults = {
        ["product_id"]: productID,
      };
      const { ratings, recommended } = results[0];
      let oldObj = {};
      let formatRating = getRatingsCounts(ratings);
      let formatRecommend = getRecommendCounts(recommended);
      results.forEach((ele) => {
        let formatCharacteristics = formatData(ele.characteristics);
        queryResults = {
          ratings: formatRating,
          recommended: formatRecommend,
        };
        oldObj[formatCharacteristics.name] = {
          id: formatCharacteristics.id,
          value: getAvg(formatCharacteristics.value).toFixed(4) || 0,
        };
      });
      queryResults.characteristics = oldObj;
      return queryResults;
    })
    .catch((err) => {
      console.error(err);
      queryResults = {
        ["product_id"]: productID,
        ratings: {},
        recommended: {},
        characteristics: {},
      };
      return queryResults;
    });
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
    response: "",
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
};

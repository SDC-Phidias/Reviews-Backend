const {
  Reviews,
  Photos,
  CharReview,
  Characteristics,
} = require("../database/MongoDB/models");
const {
  getRecommendCounts,
  getRatingsCounts,
  formatData,
  getAvg,
  filterSort
} = require("./helper");
const {
  getNewCharID,
  getNewReviewID,
  getNewPhotoID,
} = require("./modelHelpers");

// route for review/list
const retrieveReviews = (productID, page, count, sort) => {
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
        sort : -1
      },
    },
    {
      $project: {
        _id: 0,
        reported: 0,
        product_id: 0,
        "photos._id": 0,
        _v: 0,
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

// route meta data
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
// route update helpfulness
const updateHelpful = async (params) => {
  let updateQuery = { $inc: { helpfulness: 1 } };
  await Reviews.findOneAndUpdate({ review_id: params }, updateQuery)
    .exec()
    .then((results) => {
      console.log("results", results);
    })
    .catch((err) => {
      return err;
    });
};
// route for reporting review
const reportReview = async (params) => {
  let updateQuery = { $set: { reported: 1 } };
  await Reviews.findOneAndUpdate({ review_id: params }, updateQuery)
    .exec()
    .then((results) => {
      console.log("results", results);
    })
    .catch((err) => {
      return err;
    });
};

// route add review
const addReview = (productID, params) => {
  let newReivewID;
  return getNewReviewID()
    .then((results) => {
      newReivewID = results;
      return;
    })
    .then(() => {
      let reviewsInstance = new Reviews({
        review_id: parseInt(newReivewID + 1),
        product_id: parseInt(productID),
        rating: parseInt(params.rating),
        date: params.date || Date.now(),
        summary: params.summary,
        body: params.body,
        recommend: Number(params.recommend) || 0,
        reported: 0,
        reviewer_name: params.name,
        reviewer_email: params.email,
        response: "",
        helpfulness: 0,
      });
      reviewsInstance.save();
      return;
    })
    .then(() => {
      if (!params.photos) {
        return;
      } else {
        const photoID = getNewPhotoID();
        const promisedPhotosSaved = params.photos.map((photo, i) => {
          let photoInstance = new Photos({
            id: parseInt(photoID) + (i + 1),
            review_id: newReivewID,
            url: photo.url,
          });
          photoInstance.save();
        });
        return Promise.all(promisedPhotosSaved);
      }
    })
    .then(() => {
      return getNewCharID();
    })
    .then((results) => {
      const {id, char_id} = results;
      const promisedCharReviewSaved = Object.entries(
        params.characteristics
      ).map((char, i) => {
        const charReviewInstance = new CharReview({
          id: parseInt(id) + (1 + i),
          characteristic_id: Number((char_id) + (1 + i)),
          review_id: newReivewID,
          value: Number(char[1].value),
        });        
        console.log(typeof char_id);
        return charReviewInstance.save();
      });
      const promisedCharSaved = Object.entries(params.characteristics).map(
        (char, i) => {
          const CharIntstance = new Characteristics({
            id: Number((char_id) + (1 + i)),
            product_id: productID,
            name: char[0],
          });
          console.log(char[0]);
          return CharIntstance.save();
        }
      );
      return Promise.all(promisedCharReviewSaved, promisedCharSaved);
    })
    .then(() => {
      return "complete";
    });
};

module.exports = {
  addReview,
  retrieveReviews,
  retrieveMeta,
  updateHelpful,
  reportReview,
};

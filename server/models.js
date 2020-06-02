const { Reviews, Photos } = require("../database/MongoDB");

const save = (params) => {
  return reviewsInstance.save();
};

const retrieveReviews = async (productID, page, count, sort) => {
  let queryResult = {};
  let promised = [];
  return Reviews.find({ product_id: productID }, { _id: 0, product_id: 0 })
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
      })
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

const retrieveMeta = (productID) => {
  
}
const update = (param, model, options) => {
  let updateQuery = { $set: { helpfulness: helpfulness } };
  return Review.findByIdAndUpdate(param_id, updateQuery, options).exec();
};

module.exports = {
  save,
  retrieveReviews,
  update,
  retrievePhotos,
};

/*
[
  {
    '$sort': {
      'product_id': 1
    }
  }, {
    '$group': {
      '_id': '$product_id', 
      'results': {
        '$push': {
          'id': '$id', 
          'rating': '$rating', 
          'date': '$date', 
          'summary': '$summary', 
          'body': '$body', 
          'recommend': '$recommend', 
          'reported': '$reported', 
          'reviewer_name': '$reviewer_name', 
          'reviewer_email': '$reviewer_email', 
          'response': '$response', 
          'helpfulness': '$helpfulness'
        }
      }
    }
  }
]
*/

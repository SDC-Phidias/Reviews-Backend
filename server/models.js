const {Reviews, Photos} = require('../database/MongoDB');

const save = (params) => {
  return reviewsInstance.save();
}

const retrieve = (productID, page, count, sort) => {
  return Reviews.find({product_id: productID}, {_id: 0 }).limit(count).sort().exec();
}

const retrievePhotos = (reviewID) => {
  return Photos.find({review_id : reviewID}, {_id: 0, review_id: 0}).exec();
}

const update = (param,model,options) => {
  let updateQuery = { $set: {helpfulness: helpfulness}}
  return Review.findByIdAndUpdate(param_id, updateQuery, options).exec();
}

module.exports = {
  save,
  retrieve,
  update,
  retrievePhotos
}

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
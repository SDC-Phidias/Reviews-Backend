const models = require("./models");

module.exports = {
  getReviews: (req, res) => {
    const productID = req.params.product_id;
    const { page = 0, count = 5, sort = "helpfulness" } = req.query;
    let queryResults = {};
    models
      .retrieve(productID, page, count, sort)
      .then((results) => {
        (queryResults.product_id = productID),
          (queryResults.page = page),
          (queryResults.count = count),
          (queryResults.results = results);
        return queryResults.results;
      })
      .then((results) => {
        results.map((ele) => {
          models.retrievePhotos(ele.review_id).then((data) => {
            return data;
          });
        });
      })
      .then(() => res.json(queryResults))
      .catch((err) => res.send("Error Retrieve Review", err));
  },
  postReviews: (req, res) => {
    models
      .save(req.body, "reviews")
      .then(() => res.sendStatus(201))
      .catch(() => console.log("Error saving Review"));
  },
  updatingReview: (req, res) => {
    models
      .update(req.body, "reviews", options)
      .then(() => res.sendStatus(204))
      .catch(() => console.log("ERROR! Did not update"));
  },
};

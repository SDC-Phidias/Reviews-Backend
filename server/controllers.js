const models = require("./models");

module.exports = {
  getReviews: (req, res) => {
    const productID = req.params.product_id;
    const { page = 0, count = 5, sort = "helpfulness" } = req.query;
    models
      .retrieveReviews(productID, page, count, sort)
      .then((results) => res.json(results))
      .catch((err) => res.status(500).send(err));
  },
  getMetaData: (req, res) => {
    const productID = req.params.product_id;
    models
      .retrieveMeta(productID)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => res.status(500));
  },
  addReviews: (req, res) => {
    console.log(req.body);
    res.sendStatus(201);
  },
  updatingReview: (req, res) => {
    models
      .update(req.body, "reviews", options)
      .then(() => res.sendStatus(204))
      .catch(() => console.log("ERROR! Did not update"));
  },
};

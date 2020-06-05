const models = require("./models");

module.exports = {
  getReviews: (req, res) => {
    /* "newest", "helpful ~> (helpfulness)", or "relevant" */
    const productID = req.params.product_id;
    let page = req.query.page || 0,
      count = req.query.count || 5,
      sort = req.query.sort;
    models
      .retrieveReviews(productID, page, count, sort)
      .then((results) => {
        return results;
      })
      .then((results) => res.json(results))
      .catch((err) => res.status(500).send(err));
  },
  getMetaData: (req, res) => {
    const productID = req.params.product_id;
    models
      .retrieveMeta(productID)      
      .then((results) => {
        return results;
      })
      .then((results) => {
        res.json(results);
      })
      .catch((err) => res.status(500).send(err));
  },
  addReviews: (req, res) => {
    const productID = req.params.product_id;
    models.addReview(productID, req.body)
    .then(() => {
      res.sendStatus(201)
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
  })
  },
  updateHelpfulness: (req, res) => {
    const reviewID = req.params.review_id;
    models
      .updateHelpful(reviewID)
      .then(() => res.sendStatus(204))
      .catch(() => res.sendStatus(500).send("Did Not Update"));
  },
  reportUpdate: (req, res) => {
    const reviewID = req.params.review_id;
    models
      .reportReview(reviewID)
      .then(() => res.sendStatus(204))
      .catch(() => res.sendStatus(500).send("Did Not Update"));
  },
};

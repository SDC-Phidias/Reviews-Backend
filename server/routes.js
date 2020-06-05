const router = require("express").Router();
const controller = require("./controllers");

router.get("/:product_id/list/", controller.getReviews);
router.get("/:product_id/meta", controller.getMetaData);
router.post('/:product_id', controller.addReviews);
router.put('/helpful/:review_id', controller.updateHelpfulness);
router.put('/report/:review_id', controller.reportUpdate);

module.exports = router;

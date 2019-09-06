const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const ReceiptsController = require('../controllers/receipts');

// Handle incoming GET requests to /receipts
router.get("/", checkAuth, ReceiptsController.receipts_get_all);

router.post("/", checkAuth, ReceiptsController.receipts_create_receipts);

// router.get("/:orderId", checkAuth, ReceiptsController.receipts_get_receipts);
//
// router.delete("/:orderId", checkAuth, ReceiptsController.receipts_delete_receipts);

module.exports = router;

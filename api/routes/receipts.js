const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const ReceiptsController = require('../controllers/receipts');

// Handle GET requests to /receipts
router.get("/", checkAuth, ReceiptsController.receipts_get_all);

// Handle POST requests to /receipts
router.post("/", checkAuth, ReceiptsController.receipts_create_receipts);

module.exports = router;

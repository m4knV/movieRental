const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const InventoryController = require("../controllers/inventory");


// Handle GET requests to /inventory
router.get("/", checkAuth, InventoryController.inventory_get_all);

module.exports = router;

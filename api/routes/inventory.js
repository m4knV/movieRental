const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const InventoryController = require("../controllers/inventory");


// Handle incoming GET requests to /orders
router.get("/", checkAuth, InventoryController.inventory_get_all);

module.exports = router;

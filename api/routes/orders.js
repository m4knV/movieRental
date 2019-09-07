const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrdersController = require('../controllers/orders');
const ReceiptsController = require('../controllers/receipts');


// Handle incoming GET requests to /orders
router.get("/", checkAuth, OrdersController.orders_get_all);

router.post("/", checkAuth, OrdersController.orders_create_order);

router.post("/:orderId/return", ReceiptsController.receipts_return_order);

router.get("/:orderId", checkAuth, OrdersController.orders_get_order);

router.delete("/:orderId", checkAuth, OrdersController.orders_delete_order);

module.exports = router;

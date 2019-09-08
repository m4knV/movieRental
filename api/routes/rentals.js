const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const RentalsController = require('../controllers/rentals');
const ReceiptsController = require('../controllers/receipts');


// Handle incoming GET requests to /rentals
router.get("/", checkAuth, RentalsController.rentals_get_all);

router.post("/", checkAuth, RentalsController.rentals_create_rental);

router.post("/:rentalId/return", ReceiptsController.receipts_return_rental);

router.get("/:rentalId", checkAuth, RentalsController.rentals_get_rental);

router.delete("/:rentalId", checkAuth, RentalsController.rentals_delete_rental);

module.exports = router;

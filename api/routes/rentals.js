const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const RentalsController = require('../controllers/rentals');
const ReceiptsController = require('../controllers/receipts');


// Handle GET requests to /rentals
router.get("/", checkAuth, RentalsController.rentals_get_all);

router.get("/:rentalId", checkAuth, RentalsController.rentals_get_rental);

// Handle POST requests to /rentals
router.post("/", checkAuth, RentalsController.rentals_create_rental);

router.post("/:rentalId/return", ReceiptsController.receipts_return_rental);

// Handle DELETE requests to /rentals
router.delete("/:rentalId", checkAuth, RentalsController.rentals_delete_rental);

module.exports = router;

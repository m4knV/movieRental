const mongoose = require("mongoose");

const Receipt = require("../models/receipt");
const Rental = require("../models/rental");

/**
 * Handler that displays all the receipts of a user
 * @param req
 * @param res
 * @param next
 */
exports.receipts_get_all = (req, res, next) => {
    Receipt.find()
        .select("rental user _id")
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                rentals: docs.map(doc => {
                    return {
                        _id: doc._id,
                        rental: doc.rentalId,
                        user: doc.userId,
                        price: doc.price,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/rentals/" + doc._id
                        }
                    };
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

/**
 * Handler that creates a new receipt from a POST request with a body
 * @param req
 * @param res
 * @param next
 */
exports.receipts_create_receipts = (req, res, next) => {
    Rental.findById(req.body.rentalId)
        .then(rental => {
            if (!rental) {
                return res.status(404).json({
                    message: "Rental not found"
                });
            }
            let finalPrice;
            if (rental.daysPassed <= 3) {
                finalPrice = rental.daysPassed * 1;
            } else {
                finalPrice = 3 + ((rental.daysPassed - 3) * 0.5);
            }
            const receipt = new Receipt({
                _id: mongoose.Types.ObjectId(),
                rental: req.body.rentalId,
                price: finalPrice
            });
            return receipt.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Receipt stored",
                createdRental: {
                    _id: result._id,
                    rental: result.rentalId,
                    price: result.price
                },
                request: {
                    type: "GET",
                    url: "http://localhost:3000/rentals/" + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

/**
 * Handler that creates a receipt for the movie that the user decides to return
 * @param req
 * @param res
 * @param next
 */
exports.receipts_return_rental = (req, res, next) => {
    const rentalId = req.params.rentalId;
    Rental.findById(rentalId)
        .then(rental => {
            if (!rental) {
                return res.status(404).json({
                    message: "Rental not found"
                });
            }

            let finalPrice;
            if (rental.daysPassed <= 3) {
                finalPrice = rental.daysPassed * 1;
            } else {
                finalPrice = 3 + ((rental.daysPassed - 3) * 0.5);
            }
            const receipt = new Receipt({
                _id: mongoose.Types.ObjectId(),
                rental: rentalId,
                price: finalPrice
            });
            return receipt.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Receipt stored",
                createdRental: {
                    _id: result._id,
                    rental: result.rentalId,
                    price: result.price
                },
                request: {
                    type: "GET",
                    url: "http://localhost:3000/rentals/" + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

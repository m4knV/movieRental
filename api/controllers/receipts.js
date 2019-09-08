const mongoose = require("mongoose");

const Receipt = require("../models/receipt");
const Rental = require("../models/rental");
const InventoryController = require("../controllers/inventory");

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

//TODO: Get the days from Rental collection
exports.receipts_create_receipts = (req, res, next) => {
    Rental.findById(req.body.rentalId)
        .then(rental => {
            if (!rental) {
                return res.status(404).json({
                    message: "Rental not found"
                });
            }
            console.log("These are the days:");
            console.log(rental.daysPassed);
            console.log("this is the end of days!");

            let finalPrice;
            if (rental.daysPassed <= 3) {
                finalPrice = rental.daysPassed * 1;
            } else {
                finalPrice = 3 + ((rental.daysPassed - 3) * 0.5);
            }
            console.log("The final Price is:");
            console.log(finalPrice);
            console.log("End of final Price!");

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

// exports.rentals_get_rental = (req, res, next) => {
//     Rental.findById(req.params.rentalId)
//         .populate("movie")
//         .exec()
//         .then(rental => {
//             if (!rental) {
//                 return res.status(404).json({
//                     message: "Rental not found"
//                 });
//             }
//             res.status(200).json({
//                 rental: rental,
//                 request: {
//                     type: "GET",
//                     url: "http://localhost:3000/rentals"
//                 }
//             });
//         })
//         .catch(err => {
//             res.status(500).json({
//                 error: err
//             });
//         });
// };
//
// exports.rentals_delete_rental = (req, res, next) => {
//     Rental.remove({ _id: req.params.rentalId })
//         .exec()
//         .then(result => {
//             res.status(200).json({
//                 message: "Rental deleted",
//                 request: {
//                     type: "POST",
//                     url: "http://localhost:3000/rentals",
//                     body: { movieId: "ID", quantity: "Number" }
//                 }
//             });
//         })
//         .catch(err => {
//             res.status(500).json({
//                 error: err
//             });
//         });
// };

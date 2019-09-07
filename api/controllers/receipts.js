const mongoose = require("mongoose");

const Receipt = require("../models/receipt");
const Order = require("../models/order");

exports.receipts_get_all = (req, res, next) => {
    Receipt.find()
        .select("order user _id")
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        order: doc.orderId,
                        user: doc.userId,
                        price: doc.price,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/orders/" + doc._id
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

//TODO: Get the days from Order collection
exports.receipts_create_receipts = (req, res, next) => {
    Order.findById(req.body.orderId)
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: "Order not found"
                });
            }
            console.log("These are the days:");
            console.log(order.daysPassed);
            console.log("this is the end of days!");

            let finalPrice;
            if (order.daysPassed <= 3) {
                finalPrice = order.daysPassed * 1;
            } else {
                finalPrice = 3 + ((order.daysPassed - 3) * 0.5);
            }
            console.log("The final Price is:");
            console.log(finalPrice);
            console.log("End of final Price!");

            const receipt = new Receipt({
                _id: mongoose.Types.ObjectId(),
                order: req.body.orderId,
                price: finalPrice
            });
            return receipt.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Receipt stored",
                createdOrder: {
                    _id: result._id,
                    order: result.orderId,
                    price: result.price
                },
                request: {
                    type: "GET",
                    url: "http://localhost:3000/orders/" + result._id
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

exports.receipts_return_order = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findById(orderId)
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: "Order not found"
                });
            }

            let finalPrice;
            if (order.daysPassed <= 3) {
                finalPrice = order.daysPassed * 1;
            } else {
                finalPrice = 3 + ((order.daysPassed - 3) * 0.5);
            }
            const receipt = new Receipt({
                _id: mongoose.Types.ObjectId(),
                order: orderId,
                price: finalPrice
            });
            return receipt.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Receipt stored",
                createdOrder: {
                    _id: result._id,
                    order: result.orderId,
                    price: result.price
                },
                request: {
                    type: "GET",
                    url: "http://localhost:3000/orders/" + result._id
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

// exports.orders_get_order = (req, res, next) => {
//     Order.findById(req.params.orderId)
//         .populate("product")
//         .exec()
//         .then(order => {
//             if (!order) {
//                 return res.status(404).json({
//                     message: "Order not found"
//                 });
//             }
//             res.status(200).json({
//                 order: order,
//                 request: {
//                     type: "GET",
//                     url: "http://localhost:3000/orders"
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
// exports.orders_delete_order = (req, res, next) => {
//     Order.remove({ _id: req.params.orderId })
//         .exec()
//         .then(result => {
//             res.status(200).json({
//                 message: "Order deleted",
//                 request: {
//                     type: "POST",
//                     url: "http://localhost:3000/orders",
//                     body: { productId: "ID", quantity: "Number" }
//                 }
//             });
//         })
//         .catch(err => {
//             res.status(500).json({
//                 error: err
//             });
//         });
// };

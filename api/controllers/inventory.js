const mongoose = require("mongoose");

const Product = require("../models/product");
const Inventory = require("../models/inventory");

exports.inventory_get_all = (req, res, next) => {
    Inventory.find()
        .select("product available _id")
        .populate("product", "available")
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        available: doc.available,
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

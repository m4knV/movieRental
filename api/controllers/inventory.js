const mongoose = require("mongoose");

const Movie = require("../models/movie");
const Inventory = require("../models/inventory");

exports.inventory_get_all = (req, res, next) => {
    Inventory.find()
        .select("movie available _id")
        .populate("movie", "available")
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                rentals: docs.map(doc => {
                    return {
                        _id: doc._id,
                        movie: doc.movie,
                        available: doc.available,
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

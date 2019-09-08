const mongoose = require("mongoose");

const Rental = require("../models/rental");
const Movie = require("../models/movie");
const Inventory = require("../models/inventory");

/**
 * Handler that displays all the rentals of a user
 * @param req
 * @param res
 * @param next
 */
exports.rentals_get_all = (req, res, next) => {
  Rental.find()
    .select("movie user daysPassed _id")
    .populate("movie", "name")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        rentals: docs.map(doc => {
          return {
            _id: doc._id,
            movie: doc.movie,
            user: doc.user,
            daysPassed: doc.daysPassed,
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
 * Handler that creates a new rental from a POST request with a body
 * @param req
 * @param res
 * @param next
 */
exports.rentals_create_rental = (req, res, next) => {
  Movie.findById(req.body.movieId)
    .then(movie => {
      if (!movie) {
        return res.status(404).json({
          message: "Movie not found"
        });
      }
      const rental = new Rental({
        _id: mongoose.Types.ObjectId(),
        movie: req.body.movieId,
        user: req.body.userId,
        daysPassed: req.body.daysPassed
      });
      return rental.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Rental stored",
        createdRental: {
          _id: result._id,
          movie: result.movie,
          user: result.user,
          daysPassed: result.daysPassed
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
 * Handler that creates a new rental for a user by providing a specific movieId and adding the movie to its inventory
 * @param req
 * @param res
 * @param next
 */
exports.rentals_make_rental = (req, res, next) => {
  const movieId = req.params.movieId;
  Movie.findById(movieId)
      .then(movie => {
        if (!movie) {
          return res.status(404).json({
            message: "Movie not found"
          });
        }
        const rental = new Rental({
          _id: mongoose.Types.ObjectId(),
          movie: movie._id,
          user: "5d6d1720062f6d1006ee21e7",
          daysPassed: 5
        });
        const inventory = new Inventory({
          _id: mongoose.Types.ObjectId(),
          movie: movie._id,
          available: "yes"
        });
        rental.save();
        return inventory.save();
      })
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Rental stored",
          createdRental: {
            _id: result._id,
            movie: result.movie,
            user: result.user,
            daysPassed: result.daysPassed
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
 * Handler that displays a specific rental based on its id
 * @param req
 * @param res
 * @param next
 */
exports.rentals_get_rental = (req, res, next) => {
  Rental.findById(req.params.rentalId)
    .populate("movie")
    .exec()
    .then(rental => {
      if (!rental) {
        return res.status(404).json({
          message: "Rental not found"
        });
      }
      res.status(200).json({
        rental: rental,
        request: {
          type: "GET",
          url: "http://localhost:3000/rentals"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

/**
 * Handler that deletes a rental with a DELETE request
 * @param req
 * @param res
 * @param next
 */
exports.rentals_delete_rental = (req, res, next) => {
  Rental.remove({ _id: req.params.rentalId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Rental deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/rentals",
          body: { movieId: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

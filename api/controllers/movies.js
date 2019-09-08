const mongoose = require("mongoose");
const Movie = require("../models/movie");

/**
 * Handler that displays all the available movies
 * @param req
 * @param res
 * @param next
 */
exports.movie_get_all = (req, res, next) => {
  Movie.find()
    .select("_id title genre descr year")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        movies: docs.map(doc => {
          return {
            title: doc.title,
            genre: doc.genre,
            descr: doc.descr,
            year: doc.year,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/movies/" + doc._id
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

/**
 * Handler that displays the available movies based on their genre
 * @param req
 * @param res
 * @param next
 */
exports.movie_get_genre = (req, res, next) => {
  const genre = req.params.genre;
  Movie.find({"genre": genre})
      .select("_id title genre descr year")
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
            movie: doc,
            request: {
              type: "GET",
              url: "http://localhost:3000/movies"
            }
          });
        } else {
          res
              .status(404)
              .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
};

/**
 * Handler that displays the available movies based on their year of production
 * @param req
 * @param res
 * @param next
 */
exports.movie_get_year = (req, res, next) => {
  const year = req.params.year;
  Movie.find({"year": year})
      .select("_id title genre descr year")
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
            movie: doc,
            request: {
              type: "GET",
              url: "http://localhost:3000/movies"
            }
          });
        } else {
          res
              .status(404)
              .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
};

/**
 * Handler that creates a new movie title by a POST request with a body
 * @param req
 * @param res
 * @param next
 */
exports.movie_create_movie = (req, res, next) => {
  const movie = new Movie({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    genre: req.body.genre,
    descr: req.body.descr,
    year: req.body.year,
  });
  movie
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created movie successfully",
        createdMovie: {
          title: result.title,
          genre: result.genre,
          descr: result.descr,
          year: result.year,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/movies/" + result._id
          }
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
 * Handler that displays a specific movie based on its id
 * @param req
 * @param res
 * @param next
 */
exports.movie_get_movie = (req, res, next) => {
  const id = req.params.movieId;
  Movie.findById(id)
    .select("_id title genre descr year")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          movie: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/movies"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
/**
 * Handler that updates a movies
 * @param req
 * @param res
 * @param next
 */
exports.movie_update_movie = (req, res, next) => {
  const id = req.params.movieId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Movie.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Movie updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/movies/" + id
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
 * Handler that deletes a movie
 * @param req
 * @param res
 * @param next
 */
exports.movie_delete = (req, res, next) => {
  const id = req.params.movieId;
  Movie.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Movie deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/movies",
          body: { name: "String", price: "Number" }
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

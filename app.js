const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const movieRoutes = require("./api/routes/movies");
const rentalRoutes = require("./api/routes/rentals");
const userRoutes = require('./api/routes/user');
const receiptRoutes = require('./api/routes/receipts');
const inventoryRoutes = require('./api/routes/inventory');

/**
 * Mongoose connection to the MongoDb
 */
mongoose.connect(
  "mongodb+srv://movie-rental:movie-rental@cluster0-q3tdj.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true
  }
);
// Promisify everything
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/movies", movieRoutes);
app.use("/rentals", rentalRoutes);
app.use("/user", userRoutes);
app.use("/receipts", receiptRoutes);
app.use("/inventory", inventoryRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;

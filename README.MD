# A RESTful API for Online Movie Rental using Node.js, MongoDB and Mongoose
Create a proof of concept app of an “Online Movies Store” from where users can perform all the
base actions in order to search and rent/book and pay an online movie ”Title”. When the user
purchase a “Title” he/she can play the movie as many times as he/she wants and the charge is
based on a per day fee.

## Use Cases:
User can get a list of all available movies.
User can get a list of available movies based on criterias example (category).
User can navigate and get the details/info of a specific movie.
User can “rent” a movie (make available for play).
User can “return” a movie.
User get the charge (“amount of money”) based on days.
User is charged 1 EU per day for the first three days and 0,5 EU per day for the days after the
first three.

## Tests
Created a sample unit test for movies.js Route.

## Additional Information for the Project

#### Project Directories Tree
```
.
├── api
│   ├── controllers
│   │   ├── inventory.js
│   │   ├── movies.js
│   │   ├── receipts.js
│   │   ├── rentals.js
│   │   └── user.js
│   ├── middleware
│   │   └── check-auth.js
│   ├── models
│   │   ├── inventory.js
│   │   ├── movie.js
│   │   ├── receipt.js
│   │   ├── rental.js
│   │   └── user.js
│   └── routes
│       ├── inventory.js
│       ├── movies.js
│       ├── receipts.js
│       ├── rentals.js
│       └── user.js
├── node modules/
├── app.js
├── nodemon.json
├── npm-debug.log
├── package.json
├── package-lock.json
├── README.MD
├── server.js
└── tests
    └── movies.js

```

#### package.json Scripts
```
"scripts": {
    "test": "mocha tests/movies.js", // test script
    "start": "nodemon server.js"     // server script
  }
```
#### nodemon.json
```
{
    "env": {
        "JWT_KEY": "secret"
    }
}
```

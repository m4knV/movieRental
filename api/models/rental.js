const mongoose = require('mongoose');

const rentalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    daysPassed: { type: Number, default: 1 }
});

module.exports = mongoose.model('Rental', rentalSchema);

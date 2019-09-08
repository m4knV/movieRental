const mongoose = require('mongoose');

const rentalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    rental: { type: mongoose.Schema.Types.ObjectId, ref: 'Rental', required: true },
    price: { type: Number, default: 1 }
});

module.exports = mongoose.model('Receipt', rentalSchema);
